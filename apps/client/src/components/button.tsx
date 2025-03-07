import clsx from "clsx"
import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import { IconType } from "react-icons"


export interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    loading?: boolean,
    startIcon?: IconType,
    iconClassName?: string
}

export function Button({ children, className, startIcon, loading, iconClassName, ...others }: ButtonProps) {
    return (
        <button 
            disabled={loading}
            className={clsx(
                'flex row items-center',
                'disabled:bg-blue-200 hover:bg-blue-400/75 cursor-pointer',
                'shadow text-center p-3 bg-blue-400 rounded-full font-medium text-white',
                className, 
                startIcon && "!pe-3.5"
            )}
            {...others}
        >
            {startIcon && startIcon({ className: clsx('mr-1 size-5 text-gray-400/75', iconClassName)  })}
            {!loading ? children : 'Loading'}
        </button>
    )
}


export function IconButton({ children, ...others }: ButtonProps) {
    return (
        <Button 
            className="!p-3 !shadow-none flex items-center justify-center !bg-blue-50 !hover:bg-blue-50"
            {...others}
        >
            {children}
        </Button>
    )
}
