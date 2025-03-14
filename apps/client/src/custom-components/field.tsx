import { startCase } from "lodash"

interface Props {
    label: string,
    value: any
}

export default function ({ label, value }: Props) {
    return (
        <div className="flex flex-col text-start leading-5">
            <p className="font-medium">{startCase(label)}</p>
            <p>{value}</p>
        </div>
    )
}