import { FieldError, FieldValues, useController, UseControllerProps } from "react-hook-form";
import { TextField, TextFieldProps } from "./text-field";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { toLower } from "lodash";

export interface SelectFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
    options: Array<any>,
    renderItem?: (value: object) => string,
    renderId?: (value: object) => string,
    value?: any,
    onChange?: (value: any) => void
}

export default function ({ options, renderItem, renderId, value, onChange, ...props }: SelectFieldProps) {
    
    const ref = useRef<HTMLDivElement>(null);
    const [inputFocused, setInputFocused] = useState(false)
    const [inputText, setInputText] = useState('')

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setInputFocused(false)
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function getRenderItemValue(value: any): string { return renderItem ? renderItem(value) : value }

    useEffect(() => {
        setInputText(getRenderItemValue(value))
    }, [value])

    return (
        <div className="relative">
            <TextField
                {...props}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={(focused) => focused && setInputFocused(focused)}
                autoComplete="off"
            />
            {inputFocused && (
                <div ref={ref} className="overflow-hidden flex flex-col absolute top-100% left-0 mt-1.5 right-0 shadow bg-white border border-gray-50 rounded-2xl *:!px-6 *:!py-2.5">
                    {options
                        .filter(option => {
                            if(!inputText) return true
                            if(getRenderItemValue(value) != inputText)
                                return toLower(getRenderItemValue(option)).startsWith(toLower(inputText))
                            if(renderId && renderId(value) == renderId(option)) 
                                return false
                            if(value == option)
                                return false
                            return true
                        })
                        .map(option => (
                            <Button 
                                className="!shadow-none hover:!bg-blue-100/75 !bg-transparent !rounded-none !text-gray-600 !text-start !font-normal" 
                                type="button" 
                                onClick={(e) => { 
                                    onChange && onChange(option)
                                    setInputFocused(false)
                                }}
                            >
                                {renderItem ? renderItem(option) : String(option)}
                            </Button>
                        ))
                    }
                </div>
            )}
        </div>
    )
}