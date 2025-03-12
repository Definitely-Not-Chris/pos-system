import { HiOutlineXMark } from "react-icons/hi2";
import { IconButton } from "./button";
import { Card } from "./card";
import { PropsWithChildren, useEffect, useRef } from "react";
import clsx from "clsx";

export interface ModalProps extends PropsWithChildren {
    title?: string,
    open: boolean,
    onToggle: () => void
    className?: string
}

export default function({ title, children, open, onToggle, className }: ModalProps) {
    
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onToggle()
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    
    if(!open) 
        return null


    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-950/20 m-0 flex justify-center items-start pt-18">
            <Card ref={ref} className={clsx("max-w-md !p-4 flex flex-col relative space-y-2.5", className)}>
                <header className="flex items-center mb-4">
                    <p className="flex-1 text-center font-medium text-gray-700">{title}</p>
                    <IconButton onClick={onToggle} className="bg-white hover:bg-gray-100 !p-2 !shadow-none absolute right-4">
                        <HiOutlineXMark className="size-4.5 text-gray-700" />
                    </IconButton>
                </header>
                {children}
            </Card>
        </div>
    )   
}