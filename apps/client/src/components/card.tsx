import clsx from "clsx"
import { PropsWithChildren } from "react"


export interface CardProps extends PropsWithChildren {
    className?: string
}

export function Card({ children, className }: CardProps) {
    return (
        <div className={clsx('rounded bg-white border border-gray-200 w-full shadow-xs', className)}>
            {children}
        </div>
    )
}

