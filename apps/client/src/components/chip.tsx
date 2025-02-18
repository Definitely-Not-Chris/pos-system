import clsx from "clsx";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";

export interface ChipProps extends PropsWithChildren {
    className?: string
    textClassName?: string,
    startIcon?: IconType,
    onClick?: () => void,
    selected?: boolean,
    size?: 'small' | 'normal',
    variant?: 'primary' | 'secondary'
}

export default function(props: ChipProps = { size: 'normal' }) {
    return (
        <button 
            type="button"
            onClick={props.onClick}
            className={clsx(
                'bg-white border-2 border-white rounded-full py-2.5 px-5 flex justify-center items-center',
                props.className,
                props.startIcon && "!py-1 !ps-2 !pe-3",
                props.onClick && "cursor-pointer hover:!border-blue-400",
                props.selected && "!bg-white !border-blue-400",
                props.size == 'small' && "!px-1.5 !py-0 !rounded-xl",
                props.variant == 'primary' && '!bg-blue-50',
            )}
        >
            {props.startIcon && (
                <div 
                    className={clsx(
                        "p-2.5 flex items-center justify-center rounded-full bg-blue-50 mr-2",
                    )}
                >
                    {props.startIcon({ className: 'size-4 text-blue-700'  })}
                </div>
            )}
            <p 
                className={clsx(
                    'font-medium text-gray-600 text-nowrap' , 
                    props.textClassName,
                    // props.size == 'small' && '!font-normal',
                    props.selected && "!text-blue-600",
                    props.variant == 'primary' && '!text-blue-600',
                )}
            >
                {props.children}
            </p>
        </button>
    )
}