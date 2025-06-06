import { HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineMagnifyingGlass   } from "react-icons/hi2";
import { IconButton } from "../../../components/button";
import Page from "../../../custom-components/table-page";
import CreateModal from "../components/create-modal";
import { TextField } from "../../../components/text-field";
import { useQuery } from "react-query";
import usersAPI from "../../../api/users";
import moment from "moment";
import Chip from "../../../components/chip";
import Center from "../../../components/center";

import UpdateModal from "../components/update-modal";
import { UserEntity } from "@pos/core/entities/user";
import { TableColumns } from "../../../components/table";

export default function () {
    const { data, isLoading, refetch } = useQuery('users', () => usersAPI.getAll())
    const users = data?.data ?? []

    const columns: TableColumns = [
        'id', 
        'firstName', 
        'lastName',
        'email', 
        {
            label: 'role',
            render: (value: any) => <Chip variant="primary" size="small">{value.role}</Chip>
        },
        {
            label: 'dateCreated',
            render: (value: any) => moment(value.dateCreated).format('MM-DD-YYYY hh:mm A')
        },
    
        {
            className: "!ps-0",
            render: (data: UserEntity) => <UpdateModal defaultvalues={data} onSuccess={refetch} />
        }
    ]

    return (
        <Page 
            actions={(
                <>
                    <div className="flex-1"></div>
                    <TextField 
                        startIcon={HiOutlineMagnifyingGlass}
                        className="!py-2.5"
                    />
                    <CreateModal onSuccess={refetch} />
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronLeft className="size-4.5 text-gray-700" />
                    </IconButton>
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronRight className="size-4.5 text-gray-700" />
                    </IconButton>
                </>
            )}
            title="Users" 
            columns={columns}
            data={users}
            loading={isLoading}
        />
    )
}