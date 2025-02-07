import clsx from "clsx";
import { PropsWithChildren } from "react";

export interface ChipProps extends PropsWithChildren {
    className?: string
    textClassName?: string
}

export default function({ children, className, textClassName }: ChipProps) {
    return (
        <div 
            className={clsx(
                'bg-white rounded-full py-3 px-5',
                className
            )}
        >
            <p className={clsx('font-medium text-gray-600 text-nowrap' , textClassName)}>{children}</p>
        </div>
    )
}