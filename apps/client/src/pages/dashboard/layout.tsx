import { Outlet } from "react-router";
import Chip from "../../components/chip";


export default function () {
    return (
        <div className="bg-gray-100 h-full flex flex-col">
            <header className="flex space-x-3 px-3 py-3">
                <div className="flex flex-row min-w-72 space-x-3 ps-2 pe-3">
                    <div className="size-12 rounded-full bg-white"></div>
                    <Chip className="flex-1">Concepcion Branch</Chip>
                </div>
                <div className="flex-1"></div>
                <Chip className="border border-gray-200 border-gray-300">Point of Sales</Chip>
                <Chip>Wed, 29 May 2024</Chip>
            </header>
            <div className="flex-1 flex flex-row">
                <div className="min-w-72 flex flex-col space-y-1 *:py-3 *:px-5 overflow-hidden bg-white rounded-r-2xl">
                    <div className="flex flex-row space-x-4 bg-blue-100">
                        <div className="size-12 rounded-full bg-blue-400"></div>
                        <p className='font-medium text-nowrap self-center text-blue-700'>Users</p>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="size-12 rounded-full bg-gray-200"></div>
                        <p className='font-medium text-gray-600 text-nowrap self-center'>Discounts</p>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="size-12 rounded-full bg-gray-200"></div>
                        <p className='font-medium text-gray-600 text-nowrap self-center'>Transactions</p>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="size-12 rounded-full bg-gray-200"></div>
                        <p className='font-medium text-gray-600 text-nowrap self-center'>Reports</p>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="size-12 rounded-full bg-gray-200"></div>
                        <p className='font-medium text-gray-600 text-nowrap self-center'>Audit Logs</p>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="size-12 rounded-full bg-gray-200"></div>
                        <p className='font-medium text-gray-600 text-nowrap self-center'>Settings</p>
                    </div>
                    <div className="flex-1"></div>
                    <div className="flex flex-row space-x-4 mb-2">
                        <div className="size-12 rounded-full bg-gray-200"></div>
                        <p className='font-medium text-gray-600 text-nowrap self-center'>Juan Dela Cruz</p>
                        <div className="size-12 rounded-full bg-gray-200"></div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col px-3">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}