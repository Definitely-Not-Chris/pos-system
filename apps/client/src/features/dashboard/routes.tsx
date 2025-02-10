import { kebabCase } from "lodash"
import { ReactNode } from "react"
import { IconBaseProps, IconType } from "react-icons";
import { 
    HiOutlineHome,
    HiOutlineUsers, 
    HiOutlineDocumentCurrencyDollar, 
    HiOutlineArrowsRightLeft,
    HiOutlineDocumentText,
    HiOutlineDocumentMagnifyingGlass,
    HiOutlineCog8Tooth
} from "react-icons/hi2";

function create(title: string, Icon?: IconType, url: string = '', component?: ReactNode) {
    return {
        title: kebabCase(title), 
        url: `/app${url}`, 
        component,
        renderIcon: (props: IconBaseProps) => Icon && <Icon {...props}/>
    }
}

export default [
    create('dashboard', HiOutlineHome),
    create('users',  HiOutlineUsers , '/users'),
    create('discounts', HiOutlineDocumentCurrencyDollar, '/discounts'),
    create('transactions', HiOutlineArrowsRightLeft , '/transactions'),
    create('reports', HiOutlineDocumentText, '/reports'),
    create('audit logs', HiOutlineDocumentMagnifyingGlass, '/audit-logs'),
    create('settings', HiOutlineCog8Tooth, '/settings'),
]