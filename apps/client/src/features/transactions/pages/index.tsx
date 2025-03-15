import { HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineMagnifyingGlass, HiMiniEye  } from "react-icons/hi2";
import { IconButton } from "../../../components/button";
import Page from "../../../custom-components/table-page";
import CreateModal from "../components/create-modal";
import { TextField } from "../../../components/text-field";
import { useQuery } from "react-query";
import transactionsAPI from "../../../api/transactions";

import UpdateModal from "../components/update-modal";
import { CheckEntity, TransactionEntity } from "@pos/core/entities";
import { TableColumns } from "../../../components/table";
import Chip from "../../../components/chip";
import { lowerCase } from "lodash";
import PaymentType from "../../../custom-components/payment-type";

export default function () {
    const { data, isLoading, refetch } = useQuery('transactions', () => transactionsAPI.getAll())
    const transactions = data?.data ?? []

    const columns: TableColumns = [
        'id',
        {
            label: "Company",
            render: (data: TransactionEntity) => data.invoice.company.name,
        },
        {
            label: "invoice Number",
            render: (data: TransactionEntity) => data.invoice.invoiceNumber,
        },
        {
            label: 'type',
            render: (data: TransactionEntity) => <PaymentType {...data} />
        },
        {
            label: "amount",
            render: (data: TransactionEntity) => data.amount.toFixed(2),
        },
        'dateCreated'
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
            title="Transactions" 
            columns={columns}
            data={transactions}
            loading={isLoading}
        />
    )
}