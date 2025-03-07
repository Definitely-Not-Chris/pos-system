import { HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineMagnifyingGlass, HiOutlinePlus, HiMiniEye  } from "react-icons/hi2";
import { Button, IconButton } from "../../../components/button";
import Page, { TableColumns } from "../../../custom-components/table-page";
import CreateModal from "../components/create-modal";
import { TextField } from "../../../components/text-field";
import { useQuery } from "react-query";
import invoicesAPI from "../../../api/invoices";
import moment from "moment";
import Chip from "../../../components/chip";
import Center from "../../../components/center";

import UpdateModal from "../components/update-modal";
import { UserEntity } from "@pos/core/entities/user";

export default function () {
    const { data, isLoading, refetch } = useQuery('invoices', () => invoicesAPI.getAll())
    const invoices = data?.data ?? []

    const columns: TableColumns = [
        {
            key: 'invoiceNumber',
            label: 'Invoice #',
            render: (value: any) => value.invoiceNumber
        },
        'name',
        'dateIssued',
        'billTo',
        'amount',
        'paymentDue',
        // {
        //     label: 'role',
        //     render: (value: any) => <Center><Chip variant="primary" size="small">{value.role}</Chip></Center>
        // },
        // {
        //     label: 'dateCreated',
        //     render: (value: any) => moment(value.dateCreated).format('MM-DD hh:mmA')
        // },
        
        {
            className: "!ps-0 !w-0",
            render: (data: UserEntity) => (
                <div className="flex row space-x-2 *:group-hover:!shadow *:!shadow-none *:!opacity-50 *:group-hover:!opacity-100">
                    <Button 
                        startIcon={HiOutlinePlus} 
                        iconClassName="!text-blue-700"
                        className="!bg-white !p-0 !px-2 !rounded-lg !text-blue-700"
                    >
                        Payment
                    </Button>
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
                        containerClassName="!rounded-2xl" 
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
            title="Invoices" 
            columns={columns}
            data={invoices}
            loading={isLoading}
        />
    )
}