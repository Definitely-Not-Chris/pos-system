import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import ChipSelect, { ChipSelectProps } from "../components/chip-select";

interface Props extends Omit<UseControllerProps<FieldValues, string>, 'value' | 'onChange'>, Omit<ChipSelectProps, 'value' | 'onChange'> {

}

export default function ({ label, options, ...props }: Props) {
    const { field, fieldState: { error } } = useController(props)
    
    return (
        <ChipSelect 
            {...field}
            options={options}
            label={label}
            error={!!error}
        />
    )
}