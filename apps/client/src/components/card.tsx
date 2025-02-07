import clsx from "clsx"
import { PropsWithChildren } from "react"


export interface CardProps extends PropsWithChildren {
    className?: string
}

export function Card({ children, className }: CardProps) {
    return (
        <div className={clsx('rounded-xl bg-white border border-gray-200/75 w-full shadow-xs p-14', className)}>
            {children}
        </div>
    )
}

