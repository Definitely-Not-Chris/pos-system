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

export interface TableProps {
    columns: TableColumns,
    data?: Array<any>,
    loading?: boolean,
    className?: string
}


export default function({ className, columns: headers, data=[], loading }: TableProps) {

    return (
        <div className={clsx(className)}>
            <table className="w-full rounded-xl overflow-hidden border-collapse table-fixed">
                <thead>
                    <tr className="bg-gray-200/75 rounded-xl">
                        {headers.map((header, index) => {
                            const label = typeof header === "string" ? header : header.label || header.key
                            return (
                                <td 
                                    key={index} 
                                    className={clsx(
                                        "py-4 px-2 first:ps-4 last:pe-4 text-gray-900 text-start",
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
                        <tr key={index} className="hover:bg-gray-200/75 group">
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
                                            "py-3 px-2 first:ps-4 last:pe-4 border-b border-gray-100 text-start",
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
        
            {data.length == 0 && (
                <div className="my-8">
                    <p className="text-md font-medium text-gray-300">No data for this module yet</p>
                </div>
            )}
        </div>
    )
}