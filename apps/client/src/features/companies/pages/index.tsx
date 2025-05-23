import { HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineMagnifyingGlass, HiMiniEye  } from "react-icons/hi2";
import { IconButton } from "../../../components/button";
import Page from "../../../custom-components/table-page";
import CreateModal from "../components/create-modal";
import { TextField } from "../../../components/text-field";
import { useQuery } from "react-query";
import companiesAPI from "../../../api/companies";

import UpdateModal from "../components/update-modal";
import { CheckEntity, CompanyEntity } from "@pos/core/entities";
import { TableColumns } from "../../../components/table";

export default function () {
    const { data, isLoading, refetch } = useQuery('companies', () => companiesAPI.getAll())
    const checks = data?.data ?? []

    const columns: TableColumns = [
        'id',
        'name',
        'address',
        'contactNumber',
        {
            className: "!ps-0",
            render: (data: CompanyEntity) => (
                <div className="flex row justify-end space-x-2 *:group-hover:!shadow *:!shadow-none *:!opacity-50 *:group-hover:!opacity-100">
                    {/* <Button 
                        startIcon={HiOutlinePlus} 
                        iconClassName="!text-blue-700"
                        className="!bg-white !p-0 !px-2 !rounded-lg !text-blue-700"
                    >
                        Payment
                    </Button> */}
                    <UpdateModal defaultvalues={data} onSuccess={refetch} />
                    <IconButton className="!bg-white !p-1 !rounded-lg"><HiMiniEye  className="size-5 text-gray-600"/></IconButton>
                </div>
            )
        }
    ]

    return (
        <Page 
            actions={(
                <>
                    <div className="flex-1"></div>
                    <TextField 
                        startIcon={HiOutlineMagnifyingGlass}
                        className="!py-2.5"
                    />
                    <CreateModal onSuccess={refetch} />
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronLeft className="size-4.5 text-gray-700" />
                    </IconButton>
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronRight className="size-4.5 text-gray-700" />
                    </IconButton>
                </>
            )}
            title="Companies" 
            columns={columns}
            data={checks}
            loading={isLoading}
        />
    )
}