import clsx from "clsx"
import { IconType } from "react-icons"

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: IconType,
    containerClassName?: string,
    error?: boolean,
    helperText?: string
}

export function TextField({ startIcon, type, containerClassName, error, helperText, ...others }: TextFieldProps) {
    return (
        <div className="flex flex-col">
            <div 
                className={clsx(
                    'bg-gray-100/75 border-2 border-gray-200/25 rounded-full',
                    'has-focus:bg-white flex flex-row items-center overflow-hidden',
                    containerClassName,
                    error ? 'border-rose-400/75 bg-rose-50/50' : 'has-hover:border-blue-400/50 has-focus:border-blue-400'
                )}
            >
                {/* <p className='mb-0.5 font-medium text-gray-700 self-start'>{label}</p> */}
                {startIcon && startIcon({ className: 'ml-4 size-5 text-gray-500'  })}
                <input 
                    {...others}
                    className={clsx(
                        'flex-1 py-3 px-5.5 outline-none placeholder:text-gray-500',
                        others.className,
                        startIcon && "!ps-2.5"
                    )}
                    type={type}
                />
            </div>
            {error && helperText && <p className={clsx("self-start ms-4 mt-1 text-sm", error ? 'text-rose-500' : 'text-gray-300')}>{helperText}</p>}
        </div>
    )
}