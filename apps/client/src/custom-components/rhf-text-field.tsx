import { FieldError, FieldValues, useController, UseControllerProps } from "react-hook-form";
import { TextField, TextFieldProps } from "../components/text-field";

interface Props extends UseControllerProps<FieldValues, string> {
    helperText?: boolean | ((error?: FieldError) => boolean),
    error?: (error?: FieldError) => string | undefined,
    inputProps?: Omit<TextFieldProps, 'defaultValue' | 'name' | 'helperText'>
}

export default function ({ helperText, inputProps, error, ...props }: Props) {
    const { field, fieldState: { error: FieldError }, formState: { isSubmitting } } = useController(props)

    const showHelperText =  !helperText ? false : typeof helperText === 'boolean' ? helperText : helperText(FieldError)
    const errorMessage = error ? error(FieldError) : FieldError?.message
    
    const onChange = (e: any) => {
        let newValue = e?.target?.value
        if(inputProps?.type == 'number')
            newValue = Number(newValue)

        return field.onChange(newValue)
    }

    return (
        <TextField 
            {...field}
            {...inputProps}
            onChange={onChange}
            disabled={isSubmitting || props.disabled}
            error={!!FieldError}
            helperText={showHelperText ? errorMessage : ''}
        />
    )
}