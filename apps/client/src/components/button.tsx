import clsx from "clsx"
import { ButtonHTMLAttributes, PropsWithChildren } from "react"


export interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
}

export function Button({ children, className, ...others }: ButtonProps) {
    return (
        <button 
            className={clsx(
                className, 
                'disabled:bg-indigo-300 hover:bg-indigo-400/75 cursor-pointer',
                'shadow text-center p-2.5 bg-indigo-400 rounded-lg font-medium text-white'
            )}
            {...others}
        >
            {children}
        </button>
    )
}

