import { Outlet } from "react-router";


export default function () {
    return (
        <div className="bg-gray-100 h-full flex">
            <div className="flex-1 flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}