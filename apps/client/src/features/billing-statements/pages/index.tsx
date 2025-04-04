import { HiOutlineChevronRight, HiOutlineChevronLeft, HiMiniEye, HiOutlineMagnifyingGlass  } from "react-icons/hi2";
import { IconButton } from "../../../components/button";
import Page from "../../../custom-components/table-page";
import { useQuery } from "react-query";
import statementsAPI from "../../../api/billing-statements";

import { CompanyEntity, InvoiceEntity } from "@pos/core/entities";
import { useNavigate } from "react-router";
import { TableColumns } from "../../../components/table";
import UpdateModal from "../components/update-modal";
import Chip from "../../../components/chip";
import { TextField } from "../../../components/text-field";
import InvoiceStatus from "../../../custom-components/invoice-status";
import useSearchQuery from "../../../hooks/custom-use-query";
import { useState } from "react";

export default function () {
    const navigate = useNavigate()
    
    const [search, setSearch] = useState('')
    const { data, isLoading, renderSearchField } = useSearchQuery({
        search,
        setSearch,
        queryKey: ['statements', search],
        queryFn: () => statementsAPI.getAll({ search }),
    })

    
    const companies = data?.data ?? []

    const columns: TableColumns = [
        'id',
        {
            key: 'name',
            label: 'Company',
            render: (data: CompanyEntity) => data.name
        },
        {
            label: 'Status',
            render: (data: CompanyEntity) => <InvoiceStatus amount={data.totalAmount} totalBalance={data.totalBalance}/>
        },
        {
            label: 'totalAmount',
            render: (data: CompanyEntity) => data.totalAmount.toFixed(2)
        },
        {
            key: 'totalBalance',
            render: (data: CompanyEntity) => data.totalBalance.toFixed(2)
        },
        {
            label: 'totalInvoice',
            render: (data: CompanyEntity) => data.invoices.length
        },
        {
            className: "!ps-0",
            render: (data: CompanyEntity) => (
                <div className="flex row justify-end space-x-2 *:group-hover:!shadow *:!shadow-none *:!opacity-50 *:group-hover:!opacity-100">
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
                    {renderSearchField()}
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