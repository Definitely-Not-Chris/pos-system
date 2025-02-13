import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { TextField, TextFieldProps } from "../components/text-field";

interface Props extends UseControllerProps<FieldValues, string> {
    helperText?: boolean,
    inputProps?: Omit<TextFieldProps, 'defaultValue' | 'name' | 'helperText'>
}

export default function ({ helperText, inputProps, ...props }: Props) {
    const { field, fieldState: { error } } = useController(props)

    return (
        <TextField 
            {...field}
            {...inputProps}
            error={!!error}
            helperText={helperText ? error?.message : ''}
        />
    )
}