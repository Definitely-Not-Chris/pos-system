import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import Chip from "../../components/chip";
import routes from "./routes";
import { startCase } from "lodash";
import clsx from "clsx";
import { HiMiniArrowRightOnRectangle  } from "react-icons/hi2";
import { useAuth } from "../../providers/auth-provider";
import { IconButton } from "../../components/button";

function SideDrawer() {
    const { user, loading } = useAuth()
    const location = useLocation();
    const navigate = useNavigate()

    return (
        <div className="min-w-72 flex flex-col space-y-1 *:py-3 *:px-5 overflow-hidden bg-white rounded-r-2xl">
            {routes.map(route => {
                const match = location.pathname == route.url
                return (
                    <button 
                        key={route.title}
                        onClick={() => { navigate(route.url) }}
                        className={clsx("cursor-pointer flex flex-row space-x-4 hover:bg-blue-100/75", match && "bg-blue-100/75")}
                    >
                        <div className={clsx("p-3 flex items-center justify-center rounded-full", match ? "bg-blue-500 text-white" : "bg-gray-200/50 text-gray-600")}>
                            {route.renderIcon({ className: 'size-6' })}
                        </div>
                        <p className={clsx('font-medium text-nowrap self-center', match ? "text-blue-700" : "text-gray-600")}>{startCase(route.title)}</p>
                    </button>
                )
            })}
            
            <div className="flex-1"></div>
            {!loading && user && (
                <div className="flex flex-row justify-between space-x-4 mb-2">
                    {/* <div className="size-12 rounded-full bg-gray-200"></div> */}
                    <p className='font-medium text-gray-600 text-nowrap self-center'>
                        {startCase(`${user.firstName} ${user.firstName}`)} 
                    </p>
                    {/* <div className="size-12 rounded-full bg-gray-200"></div> */}
                    <IconButton className="!shadow-none !p-3.5 !rounded-full !bg-gray-200/50"><HiMiniArrowRightOnRectangle className="size-5 text-gray-600"/></IconButton>
                    
                </div>
            )}
        </div>
    )
}

function Header() {
    return (
        <header className="flex space-x-3 px-3 py-3">
            <div className="flex flex-row min-w-72 space-x-3 ps-2 pe-3">
                <div className="size-12.5 rounded-full bg-white"></div>
                <Chip className="flex-1">CODE 456-789</Chip>
            </div>
            <div className="flex-1"></div>
            {/* <Chip 
                startIcon={HiOutlineComputerDesktop} 
                textClassName="!text-blue-600"
                onClick={() => {}}
            >
                Point of Sales
            </Chip> */}
            <Chip>Wed, 29 May 2024</Chip>
        </header>
    )
}

export default function () {
    const auth = useAuth()
    
    if(!auth.user) {
        return <Navigate replace to='/auth/login' />
    }

    return (
        <div className="bg-gray-100 h-full flex flex-col">
            <Header />
            <div className="flex-1 flex flex-row">
                <SideDrawer />
                <div className="flex-1 flex flex-col px-3">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}