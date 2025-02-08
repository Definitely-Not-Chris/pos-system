import clsx from "clsx"
import { IconType } from "react-icons"

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    startIcon?: IconType,
    containerClassName?: string
}

export function TextField({ label, startIcon, type, containerClassName, ...others }: TextFieldProps) {
    return (
        <div 
            className={clsx(
                'bg-gray-100/75 border-2 border-gray-200/25 rounded-full',
                'has-hover:border-blue-500 has-focus:border-blue-500',
                'has-focus:bg-white flex flex-row items-center',
                containerClassName
            )}
        >
            {/* <p className='mb-0.5 font-medium text-gray-700 self-start'>{label}</p> */}
            {startIcon && startIcon({ className: 'ml-4 size-5 text-gray-500'  })}
            <input 
                {...others}

                placeholder={label} 
                className={clsx(
                    'flex-1 py-3 px-5.5 outline-none placeholder:text-gray-400',
                    others.className,
                    startIcon && "!ps-2.5"
                )}
                type={type}
            />
        </div>
    )
}