import { HiOutlineChevronRight, HiOutlineChevronLeft, HiMiniEye  } from "react-icons/hi2";
import { IconButton } from "../../../components/button";
import Page from "../../../custom-components/table-page";
import { useQuery } from "react-query";
import companiesAPI from "../../../api/companies";

import { CompanyEntity, InvoiceEntity } from "@pos/core/entities";
import { useNavigate } from "react-router";
import { TableColumns } from "../../../components/table";
import UpdateModal from "../components/update-modal";
import Chip from "../../../components/chip";

export default function () {
    const navigate = useNavigate()
    const { data, isLoading, refetch } = useQuery('billing-statements', () => companiesAPI.getAll())
    const companies = data?.data ?? []

    const columns: TableColumns = [
        'id',
        {
            key: 'name',
            label: 'Company',
            render: (data: CompanyEntity) => data.name
        },
        {
            key: 'totalBalance',
            render: (data: CompanyEntity) => data.totalBalance.toFixed(2)
        },
        {
            label: 'Total Invoice',
            render: (data: CompanyEntity) => data.invoices.length
        },
        {
            label: 'Status',
            render: (data: CompanyEntity) => <Chip variant="primary" size="small">pending</Chip>
        },
        'address',
        'dateCreated',
        {
            className: "!ps-0",
            render: (data: CompanyEntity) => (
                <div className="flex row justify-end space-x-2 *:group-hover:!shadow *:!shadow-none *:!opacity-50 *:group-hover:!opacity-100">
                    {/* <AddTransactionModal invoice={data} onSuccess={refetch} /> */}
                    <UpdateModal defaultvalues={data} onSuccess={refetch} />
                    <IconButton onClick={() => navigate(data.id.toString())} className="!bg-white !p-1 !rounded-lg"><HiMiniEye  className="size-5 text-gray-600"/></IconButton>
                </div>
            )
        }
    ]

    return (
        <Page 
            actions={(
                <>
                    <div className="flex-1"></div>
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronLeft className="size-4.5 text-gray-700" />
                    </IconButton>
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronRight className="size-4.5 text-gray-700" />
                    </IconButton>
                </>
            )}
            title="Billing Statements" 
            columns={columns}
            data={companies}
            loading={isLoading}
        />
    )
}