import { Outlet, useLocation, useNavigate } from "react-router";
import Chip from "../../components/chip";
import routes from "./routes";
import { startCase } from "lodash";
import clsx from "clsx";
import { HiOutlineComputerDesktop } from "react-icons/hi2";

function SideDrawer() {
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
                        className={clsx("cursor-pointer flex flex-row space-x-4 hover:bg-blue-100", match && "bg-blue-100")}
                    >
                        <div className={clsx("p-3 flex items-center justify-center rounded-full", match ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600")}>
                            {route.renderIcon({ className: 'size-6' })}
                        </div>
                        <p className={clsx('font-medium text-nowrap self-center', match ? "text-blue-700" : "text-gray-600")}>{startCase(route.title)}</p>
                    </button>
                )
            })}
            
            <div className="flex-1"></div>
            <div className="flex flex-row space-x-4 mb-2">
                <div className="size-12 rounded-full bg-gray-200"></div>
                <p className='font-medium text-gray-600 text-nowrap self-center'>Juan Dela Cruz</p>
                <div className="size-12 rounded-full bg-gray-200"></div>
            </div>
        </div>
    )
}

function Header() {
    return (
        <header className="flex space-x-3 px-3 py-3">
            <div className="flex flex-row min-w-72 space-x-3 ps-2 pe-3">
                <div className="size-12.5 rounded-full bg-white"></div>
                <Chip className="flex-1">Concepcion Branch</Chip>
            </div>
            <div className="flex-1"></div>
            <Chip 
                startIcon={HiOutlineComputerDesktop} 
                textClassName="!text-blue-600"
                onClick={() => {}}
            >
                Point of Sales
            </Chip>
            <Chip>Wed, 29 May 2024</Chip>
        </header>
    )
}

export default function () {
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