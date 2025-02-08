import { TextField } from "../components/text-field";
import { HiOutlineMagnifyingGlass, HiOutlinePlus } from "react-icons/hi2";
import { IconButton } from "../components/button";

export interface PageProps {
    title: string
}

export default function({ title }: PageProps) {
    return (
        <div className="flex-1 *:rounded-2xl *:bg-white flex flex-col space-y-1.5 overflow-hidden">
            <div className="flex flex-row items-center p-3 space-x-2">
                <h1 className="font-medium ms-2">{title}</h1>
                <div className="flex-1"></div>
                <TextField 
                    startIcon={HiOutlineMagnifyingGlass}
                    className="!py-2.5" 
                />
                <IconButton>
                    <HiOutlinePlus className="size-4.5 text-blue-700" />
                </IconButton>
            </div>
            <div className="flex-1 p-3">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="py-2.5 px-2 bg-gray-100 rounded-full font-medium text-gray-500">#</td>
                            <td className="py-2.5 px-2 bg-gray-100 rounded-full font-medium text-gray-500">Customer</td>
                            <td className="py-2.5 px-2 bg-gray-100 rounded-full font-medium text-gray-500">Cashier</td>
                            <td className="py-2.5 px-2 bg-gray-100 rounded-full font-medium text-gray-500">Total Discount</td>
                            <td className="py-2.5 px-2 bg-gray-100 rounded-full font-medium text-gray-500">Gross Sales</td>
                            <td className="py-2.5 px-2 bg-gray-100 rounded-full font-medium text-gray-500">Net Sales</td>
                            <td className="py-2.5 px-2 bg-gray-100 rounded-full font-medium text-gray-500">Date & Time</td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    )
}