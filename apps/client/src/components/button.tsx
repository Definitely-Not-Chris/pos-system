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
                'disabled:bg-blue-300 hover:bg-blue-400/75 cursor-pointer',
                'shadow text-center p-3 bg-blue-400 rounded-full font-medium text-white'
            )}
            {...others}
        >
            {children}
        </button>
    )
}

