import { ReactNode } from "react";

export interface PageProps {
    title: string,
    headers: string[],
    actions?: ReactNode
}


export default function({ title, headers, actions }: PageProps) {

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
                            {headers.map(header => (
                                <td className="py-2.5 px-2 bg-gray-100 rounded-full text-gray-600">
                                    {header}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    )
}