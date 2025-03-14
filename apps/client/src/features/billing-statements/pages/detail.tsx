import { useParams } from "react-router";
import { useQuery } from "react-query";
import companiesAPI from "../../../api/companies";
import Table, { TableColumns, tableStyles } from "../../../components/table";
import { InvoiceEntity } from "@pos/core/entities";
import clsx from "clsx";
import Field from "../../../custom-components/field";
import UpdateModal from "../components/update-modal";
import { Button, IconButton } from "../../../components/button";
import { HiMiniPrinter } from "react-icons/hi2";



export default function () {
    const { id } = useParams()

    const { data: company, isLoading, refetch } = useQuery({
        queryKey: ['billing-statements', id],
        queryFn: () => companiesAPI.getOne(id)
    })
    

    const columns: TableColumns = [
        'invoiceNumber',
        'name',
        'dateCreated',
        {
            label: 'amount',
            className: "!text-end",
            render: (data: InvoiceEntity) => data.amount.toFixed(2)
        },
        {
            label: 'balance',
            className: "!text-end",
            render: (data: InvoiceEntity) => data.totalBalance.toFixed(2)
        },
    ]

    if(isLoading || !company) return 'Loading...'

    return (
        <div className="text-gray-600 self-center max-w-6xl p-6 w-full rounded-2xl bg-white overflow-hidden">
            <header className="flex mb-6 border-b-8 border-gray-100 pb-6 flex-row justify-between w-full space-x-2 items-center">
                <p className="text-xl  font-medium">
                    Billing Statement
                </p>
                {/* <UpdateModal defaultvalues={company} onSuccess={refetch} /> */}
            </header>
           
            {/* <div className="p-6">
                <header className="flex mb-8 flex-row justify-between w-full">
                    
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
                    <Field label="totalBalance" value={invoice.totalBalance.toFixed(2)}/>
                    <Field label="dateIssued" value={invoice.dateIssued}/>
                    <Field label="paymentDue" value={invoice.paymentDue}/>
                    <Field label="dateCreated" value={invoice.dateCreated}/>
                    <Field label="dateUpdated" value={invoice.dateUpdated}/>
                </div>
            </div> */}
            <div className="grid grid-cols-5 gap-6 mb-8">
                <Field label="billing number" value={company.id}/>
                <Field label="company" value={company.name}/>
                <Field label="total invoice" value={company.invoices.length}/>
                <Field label="address" value={company.address}/>
                {/* <Field label="totalBalance" value={invoice.totalBalance.toFixed(2)}/> */}
                {/* <Field label="dateIssued" value={invoice.dateIssued}/> */}
                {/* <Field label="paymentDue" value={invoice.paymentDue}/> */}
                {/* <Field label="dateCreated" value={invoice.dateCreated}/> */}
                {/* <Field label="dateUpdated" value={invoice.dateUpdated}/> */}
            </div>
            <Table 
                columns={columns}
                data={company?.invoices}
                lastRow={(
                    <>
                        <tr className={clsx(tableStyles.tableRow, '!bg-gray-100')}>
                            <td className={clsx(tableStyles.tableData, '!text-end !font-medium')} colSpan={4}>Total Amount: </td>
                            <td className={clsx(tableStyles.tableData, '!text-end !font-medium')}>{company.totalAmount.toFixed(2)}</td>
                        </tr>
                        <tr className={clsx(tableStyles.tableRow, '!bg-gray-100')}>
                            <td className={clsx(tableStyles.tableData, '!text-end !font-medium')} colSpan={4}>Total Balance: </td>
                            <td className={clsx(tableStyles.tableData, '!text-end !font-medium')}>{company.totalBalance.toFixed(2)}</td>
                        </tr>
                    </>
                )}
            />
        </div>
    )
}