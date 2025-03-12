import clsx from "clsx"
import { PropsWithChildren } from "react"


export interface CardProps extends PropsWithChildren, React.HtmlHTMLAttributes<HTMLDivElement> {
    className?: string
    ref?: any
}

export function Card({ children, className, ...others }: CardProps) {
    return (
        <div 
            className={clsx('rounded-2xl bg-white border border-gray-200/75 w-full shadow-xs p-14', className)}
            {...others}
        >
            {children}
        </div>
    )
}

