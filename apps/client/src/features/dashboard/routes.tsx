import { UserEntity } from "@pos/core/entities";
import { RoleEnum } from "@pos/core/enums/role";
import { kebabCase } from "lodash"
import { ReactNode } from "react"
import { IconBaseProps, IconType } from "react-icons";
import { 
    HiOutlineUsers, 
    HiOutlineDocumentCurrencyDollar, 
    HiOutlineArrowsRightLeft,
    HiOutlineBanknotes,
    HiOutlineDocumentDuplicate,
    HiOutlineBuildingOffice2
} from "react-icons/hi2";

function create(title: string, Icon?: IconType, url: string = '', roles?: RoleEnum[]) {
    return {
        title: kebabCase(title), 
        url: `/app${url}`, 
        renderIcon: (props: IconBaseProps) => Icon && <Icon {...props}/>,
        isAuthorized: (user?: UserEntity) => {
            if(user == undefined) return false
            if(user.role == RoleEnum.ADMIN) return true
            if(roles == undefined) return false
            return roles.includes(user.role)
        },
    }
}

export default [
    create('users',  HiOutlineUsers , '/users'),
    create('invoices', HiOutlineDocumentCurrencyDollar, '/invoices', [RoleEnum.INVOICE]),
    create('transactions', HiOutlineArrowsRightLeft, '/transactions', [RoleEnum.INVOICE, RoleEnum.PAYMENT]),
    create('companies', HiOutlineBuildingOffice2, '/companies', [RoleEnum.INVOICE]),
    create('checks', HiOutlineBanknotes, '/checks', [RoleEnum.INVOICE, RoleEnum.PAYMENT]),
    create('billing-statements', HiOutlineDocumentDuplicate, '/billing-statements', [RoleEnum.INVOICE]),
]