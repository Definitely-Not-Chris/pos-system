import { useQuery } from "react-query";
import invoicesAPI from "../../../api/invoices";
import RhfSelectField from "../../../custom-components/rhf-select-field";
import { CompanyEntity, InvoiceEntity } from "@pos/core/entities";


export default function () {
    const { data, isLoading, refetch } = useQuery('invoices', () => invoicesAPI.getAll())
    const invoices = data?.data || []

    return (
        <RhfSelectField 
            name="invoice"
            inputProps={{ 
                placeholder: "Invoice",
                options: invoices,
                renderId: (item: InvoiceEntity) => item?.id,
                renderItem: (item: InvoiceEntity) => item ? `${item?.invoiceNumber} - ${item?.company?.name} - ${item?.name}` : '',
            }}
        />
    )
}