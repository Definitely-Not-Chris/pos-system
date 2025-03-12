import { FieldError, FieldValues, useController, UseControllerProps } from "react-hook-form";
import SelectField, { SelectFieldProps } from "../components/select-field";

interface Props extends  UseControllerProps<FieldValues, string> {
    helperText?: boolean | ((error?: FieldError) => boolean),
    error?: (error?: FieldError) => string | undefined,
    inputProps: Omit<SelectFieldProps, 'name' | 'defaultValue' | 'helperText' | 'error'>,
}

export default function ({ helperText, error, inputProps, ...props }: Props) {
    const { field, fieldState: { error: FieldError }, formState: { isSubmitting } } = useController(props)
    
    const showHelperText =  !helperText ? false : typeof helperText === 'boolean' ? helperText : helperText(FieldError)
    const errorMessage = error ? error(FieldError) : FieldError?.message

    return (
        <SelectField 
            {...field}
            {...inputProps}
            disabled={isSubmitting || props.disabled}
            error={!!FieldError}
            helperText={showHelperText ? errorMessage : ''}
        />
    )
}