import { InvoiceEntity } from "@pos/core/entities";
import Chip from "../components/chip";

interface Props {
    amount: InvoiceEntity['amount']
    totalBalance: InvoiceEntity['totalBalance']
}

export default function ({ totalBalance, amount }: Props) {
    return (
        <Chip 
            variant={totalBalance == 0 ? 'secondary' : totalBalance != amount ? 'primary' : 'gray'} 
            size="small"
        >
            {totalBalance == 0 ? 'paid' : totalBalance != amount ? 'partial' : 'no-payment'}
        </Chip>
    )
}