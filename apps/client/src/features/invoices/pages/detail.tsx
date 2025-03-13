import { useParams } from "react-router";
import AddTransactionModal from "../components/add-transaction-modal";
import { useQuery } from "react-query";
import invoicesAPI from "../../../api/invoices";
import { omit, pick, startCase } from "lodash";
import Table, { TableColumns } from "../../../components/table";
import Chip from "../../../components/chip";
import { TransactionEntity } from "@pos/core/entities/transaction";



export default function () {
    const { id } = useParams()

    const { data: invoice, isLoading, refetch } = useQuery({
        queryKey: ['invoice', id],
        queryFn: () => invoicesAPI.getOne({ id })
    })
    

    const columns: TableColumns = [
        'id',
        'name',
        {
            label: 'type',
            render: (data: TransactionEntity) => <Chip variant="primary" size="small">{data.type}</Chip>
        },
        'date',
        'amount',
        'dateCreated'
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
                    {Object.entries(pick(invoice, ['name', 'dateIssued', 'paymentDue', 'dateCreated', 'dateUpdated']))
                        .map(([key, value]) => (
                            <div key={key} className="flex flex-col text-start leading-5">
                                <p className="font-medium ">{startCase(key)}</p>
                                <p className="">{value as any}</p>
                            </div>
                        ))
                    }
                    <div className="flex flex-col text-start leading-5">
                        <p className="font-medium ">Total Amount</p>
                        <p>{invoice.amount}</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-6">
                <p className="font-medium mb-3 text-start">Transactions</p>
                <Table 
                    columns={columns}
                    data={invoice?.transactions}
                />
            </div>
        </div>
    )
}