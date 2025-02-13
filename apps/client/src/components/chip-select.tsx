import Chip from "./chip";
import { startCase } from "lodash";
import { FieldBaseProps } from "./types";
import clsx from "clsx";

export interface ChipSelectProps extends FieldBaseProps {
    options: Array<string>,
    value: string,
    onChange: (value?: string) => void,
}

export default function (props: ChipSelectProps) {
    // const [selected, setSelected] = useState<string | undefined>()
    // console.log(selected)

    return (
        <div className="flex items-center">
            {props.label && <p className="ms-4 text-gray-500">{props.label}</p>}
            <div className="flex-1"></div>
            <div className="flex flex-row space-x-1">
                {props.options.map((option, index) => (
                    <Chip 
                        selected={props.value == option} 
                        onClick={() => props.onChange(option)}
                        className={clsx("!bg-gray-100 py-2 px-4.5", props.error && '!border-rose-400/75 !bg-rose-50/50')}
                    >
                        {startCase(option)}
                    </Chip>
                ))}
            </div>
        </div>
    )
}