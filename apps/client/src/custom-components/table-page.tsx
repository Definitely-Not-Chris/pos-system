import clsx from "clsx";
import { startCase } from "lodash";
import { ReactNode } from "react";
import Table, { TableProps } from "../components/table";


export interface PageProps extends TableProps {
    title: string,
    actions?: ReactNode,
}


export default function({ title, actions, ...others }: PageProps) {

    return (
        <div className="flex-1 *:rounded-2xl *:bg-white flex flex-col space-y-1.5 overflow-hidden">
            <div className="flex flex-row items-center justify-between p-3 space-x-2 min-h-18">
                <h1 className="font-medium ms-2 text-gray-600">{title}</h1>
                <div className="flex-1"></div>
                {actions}
            </div>
            <div className="flex-1 p-3">
                <Table className="p-3" {...others}/>
            </div>
        </div>
    )
}