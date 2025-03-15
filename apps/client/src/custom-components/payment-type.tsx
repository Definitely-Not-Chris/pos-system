import { TransactionEntity } from "@pos/core/entities";
import Chip from "../components/chip";
import { lowerCase } from "lodash";

interface Props {
    type: TransactionEntity['type']
}

export default function ({ type }: Props) {

    return (
        <Chip 
            variant={type == 'Payment' ? 'secondary' : 'primary'} 
            size="small"
        >
            {lowerCase(type)}
        </Chip>
    )
}