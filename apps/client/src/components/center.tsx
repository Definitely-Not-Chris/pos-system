import { PropsWithChildren } from "react";



export default function(props: PropsWithChildren) {
    return (
        <div className="flex items-center justify-center">
            {props.children}
        </div>
    )
}