import { Outlet } from "react-router";
import { Card } from "../../components/card";


export default function () {
    return (
        <div className="bg-indigo-50 h-full flex">
            <div className="flex-1 flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}