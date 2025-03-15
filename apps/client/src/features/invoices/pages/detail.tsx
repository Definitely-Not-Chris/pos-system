import { useParams } from "react-router";
import AddTransactionModal from "../components/add-transaction-modal";
import { useQuery } from "react-query";
import invoicesAPI from "../../../api/invoices";
import { lowerCase } from "lodash";
import Table, { TableColumns } from "../../../components/table";
import Chip from "../../../components/chip";
import { TransactionEntity } from "@pos/core/entities/transaction";
import { IconButton } from "../../../components/button";
import { HiMiniTrash } from "react-icons/hi2";
import Field from "../../../custom-components/field";
import PaymentType from "../../../custom-components/payment-type";



export default function () {
    const { id } = useParams()

    const { data: invoice, isLoading, refetch } = useQuery({
        queryKey: ['invoice', id],
        queryFn: () => invoicesAPI.getOne(id)
    })

    console.log(invoice)

    const columns: TableColumns = [
        'id',
        {
            label: 'type',
            render: (data: TransactionEntity) => <PaymentType {...data} />
        },
        {
            label: 'amount',
            render: (data: TransactionEntity) => data.amount.toFixed(2)
        },
        'dateCreated',
        // {
        //     className: "!ps-0",
        //     render: (data: TransactionEntity) => (
        //         <div className="flex row justify-end space-x-2 *:group-hover:!shadow *:!shadow-none *:!opacity-50 *:group-hover:!opacity-100">
        //             <IconButton onClick={() => {}} className="!bg-white !p-1 !rounded-lg"><HiMiniTrash  className="size-5 text-gray-600"/></IconButton>
        //         </div>
        //     )
        // }
    ]

    if(isLoading || !invoice) return 'Loading...'

    return (
        <div className="text-gray-600 flex-1 self-center max-w-6xl w-full *:rounded-2xl *:bg-white flex flex-col space-y-1.5 overflow-hidden">
            <div className="p-6">
                <header className="flex mb-8 flex-row justify-between w-full">
                    <p className="text-xl font-medium ">
                        Invoice #{invoice?.invoiceNumber}
                    </p>
                    <div className="flex flex-row items-center">
                        <AddTransactionModal 
                            invoice={invoice} 
                            buttonClassname="!shadow-none" 
                            onSuccess={refetch}
                        />
                    </div>
                </header>
                <div className="grid grid-cols-4 gap-6">
                    <Field label="name" value={invoice.name}/>
                    <Field label="company" value={invoice.company.name}/>
                    <Field label="amount" value={invoice.amount.toFixed(2)}/>
                    <Field label="balance" value={invoice.totalBalance.toFixed(2)}/>
                    <Field label="dateIssued" value={invoice.dateIssued}/>
                    <Field label="paymentDue" value={invoice.paymentDue}/>
                    <Field label="dateCreated" value={invoice.dateCreated}/>
                </div>
            </div>
            <div className=" p-6">
                <p className="font-medium mb-3 text-start">Transactions</p>
                <Table 
                    columns={columns}
                    data={invoice?.transactions}
                />
            </div>
        </div>
    )
}