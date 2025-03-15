import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../../providers/auth-provider";


export default function () {
    const auth = useAuth()
    
    if(auth.user) {
        return <Navigate replace to={auth.redirect} />
    }

    return (
        <div className="bg-gray-100 h-full flex">
            <div className="flex-1 flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}