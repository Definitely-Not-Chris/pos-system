import { HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineMagnifyingGlass   } from "react-icons/hi2";
import { IconButton } from "../../../components/button";
import Page from "../../../custom-components/table-page";
import Modal from "../components/modal";
import { TextField } from "../../../components/text-field";
import { useQuery } from "react-query";
import usersAPI from "../../../api/users";


export default function () {
    const { data, isLoading, refetch } = useQuery('users', () => usersAPI.getAll())
    const users = data?.data ?? []

    return (
        <Page 
            actions={(
                <>
                    <Modal onSuccess={refetch} />
                    <TextField 
                        startIcon={HiOutlineMagnifyingGlass}
                        className="!py-2.5" 
                    />
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronLeft className="size-4.5 text-gray-700" />
                    </IconButton>
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronRight className="size-4.5 text-gray-700" />
                    </IconButton>
                </>
            )}
            title="Users" 
            headers={['id', 'firstName', 'lastName', 'email', 'role', 'dateCreated', 'isActive']}
            data={users}
            loading={isLoading}
        />
    )
}