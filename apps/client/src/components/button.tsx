import clsx from "clsx"
import { ButtonHTMLAttributes, PropsWithChildren } from "react"


export interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    loading?: boolean
}

export function Button({ children, className, loading, ...others }: ButtonProps) {
    return (
        <button 
            disabled={loading}
            className={clsx(
                'disabled:bg-blue-200 hover:bg-blue-400/75 cursor-pointer',
                'shadow text-center p-3 bg-blue-400 rounded-full font-medium text-white',
                className, 
            )}
            {...others}
        >
            {!loading ? children : 'Loading'}
        </button>
    )
}


export function IconButton({ children, ...others }: ButtonProps) {
    return (
        <Button 
            className="!p-3.5 !shadow-none flex items-center justify-center !bg-blue-200/50 !hover:bg-blue-50"
            {...others}
        >
            {children}
        </Button>
    )
}
