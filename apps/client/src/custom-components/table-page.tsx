import { startCase } from "lodash";
import { ReactNode } from "react";


export type TableHeader = {
    key: string,
    label: string
}

export function createTableHeader(key: string, label: string): TableHeader {
    return { key, label }
}

export interface PageProps {
    title: string,
    headers: Array<string | TableHeader>,
    actions?: ReactNode,
    data?: Array<any>,
    loading?: boolean
}


export default function({ title, headers, actions, data=[], loading }: PageProps) {

    return (
        <div className="flex-1 *:rounded-2xl *:bg-white flex flex-col space-y-1.5 overflow-hidden">
            <div className="flex flex-row items-center justify-between p-3 space-x-2">
                <h1 className="font-medium ms-2">{title}</h1>
                <div className="flex-1"></div>
                {actions}
            </div>
            <div className="flex-1 p-3">
                <table className="w-full">
                    <thead>
                        <tr>
                            {headers.map(header => {
                                const label = typeof header === "string" ? header : header.label
                                return (
                                    <td key={label} className="py-2.5 px-2 bg-gray-100 rounded-full text-gray-600">
                                        {startCase(label)}
                                    </td>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && data.map((item, index) => (
                            <tr key={index}>
                                {headers.map(header => {
                                    const key = typeof header === "string" ? header : header.key
                                    const value = item[key]
                                    return (
                                        <td key={key} className="py-3 text-gray-900 border-b border-gray-100">{String(value)}</td>
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