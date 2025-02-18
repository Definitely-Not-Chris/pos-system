import clsx from "clsx";
import { startCase } from "lodash";
import { ReactNode } from "react";


export type TableHeader = {
    key?: string,
    label?: string,
    render?: (rowValue: any) => ReactNode,
    className?: string
} 

export type TableColumn = string | TableHeader
export type TableColumns = Array<TableColumn>

export interface PageProps {
    title: string,
    columns: TableColumns,
    actions?: ReactNode,
    data?: Array<any>,
    loading?: boolean
}


export default function({ title, columns: headers, actions, data=[], loading }: PageProps) {

    return (
        <div className="flex-1 *:rounded-2xl *:bg-white flex flex-col space-y-1.5 overflow-hidden">
            <div className="flex flex-row items-center justify-between p-3 space-x-2">
                <h1 className="font-medium ms-2 text-gray-600">{title}</h1>
                <div className="flex-1"></div>
                {actions}
            </div>
            <div className="flex-1 p-3">
                <table className="w-full rounded-xl overflow-hidden border-collapse">
                    <thead>
                        <tr className="bg-gray-100 rounded-xl">
                            {headers.map(header => {
                                const label = typeof header === "string" ? header : header.label || header.key
                                return (
                                    <td 
                                        key={label} 
                                        className={clsx(
                                            "py-4 px-2 text-gray-600",
                                            typeof header != "string" && header.className
                                        )}
                                    >
                                        {startCase(label)}
                                    </td>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100 group">
                                {headers.map((header, index) => {
                                    let value = null

                                    if(typeof header === "string"){
                                        const key = header
                                        value = item[key]
                                    } else if (header.render) {
                                        value = header.render(item)
                                    } else {
                                        value = String(header.label) || ''
                                    } 


                                    return (
                                        <td 
                                            key={index} 
                                            className={clsx(
                                                "py-3 border-b border-gray-100",
                                                typeof header != "string" && header.className
                                            )}
                                        >
                                            {value}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}