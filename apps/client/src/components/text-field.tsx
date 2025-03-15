import clsx from "clsx"
import { IconType } from "react-icons"
import { FieldBaseProps } from "./types"
import { useEffect, useRef } from "react";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onFocus'>, FieldBaseProps {
    startIcon?: IconType,
    endIcon?: IconType,
    containerClassName?: string,
    onFocus?: (focused: boolean) => void,
}

export function TextField({ startIcon, endIcon, onFocus, type, containerClassName, error, helperText, disabled, ...others }: TextFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleFocus = () => {
            onFocus && onFocus(true)
        };

        const handleBlur = () => {
            onFocus && onFocus(false)
        };
      
        const inputElement = inputRef.current;
    
        if (inputElement) {
          inputElement.addEventListener('focus', handleFocus);
          inputElement.addEventListener('blur', handleBlur);
    
          return () => {
            inputElement.removeEventListener('focus', handleFocus);
            inputElement.addEventListener('blur', handleBlur);
          };
        }
    }, [])
    
    return (
        <div className="flex flex-col">
            <div 
                className={clsx(
                    'bg-gray-100 border-2 border-gray-200/25 rounded-full',
                    'has-focus:bg-white flex flex-row items-center overflow-hidden',
                    containerClassName,
                    error ? 'border-rose-400/75 bg-rose-50/50' : 'has-hover:border-blue-400/50 has-focus:border-blue-500',
                    disabled && "opacity-60 !border-white" 
                )}
            >
                {/* <p className='mb-0.5 font-medium text-gray-700 self-start'>{label}</p> */}
                {startIcon && startIcon({ className: 'ml-3.5 size-5 text-gray-400'  })}
                <input 
                    {...others}
                    ref={inputRef}
                    disabled={disabled}
                    className={clsx(
                        'flex-1 py-3 px-5.5 w-full sm:w-auto outline-none placeholder:text-gray-500 disabled:italic',
                        others.className,
                        startIcon && "!ps-2.5"
                    )}
                    type={type}
                />
                {endIcon && endIcon({ className: 'mr-3.5 size-5 text-gray-400'  })}
            </div>
            {error && helperText && <p className={clsx("self-start ms-4 mt-1 text-sm", error ? 'text-rose-500' : 'text-gray-300')}>{helperText}</p>}
        </div>
    )
}