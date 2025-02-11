import { useState } from "react"
import { HiOutlinePlus } from "react-icons/hi2"
import { Button, IconButton } from "../../../components/button"
import Modal from "../../../components/modal"
import { TextField } from "../../../components/text-field"
import Chip from "../../../components/chip"

export default function () {
    const [open, setOpen] = useState(false)
    const onToggle = () => setOpen(v => !v)

    return (
        <>
            <Modal 
                open={open}
                onToggle={onToggle}
                title="Create User"
            >
                <TextField label="First Name"/>
                <TextField label="Last Name"/>
                <TextField label="Email Address"/>
                <div className="flex items-center">
                    <p className="ms-4 text-gray-500">Role: </p>
                    <div className="flex-1"></div>
                    <Chip onClick={() => {}} className="!bg-gray-100 mr-1">Admin</Chip>
                    <Chip onClick={() => {}} className="!bg-gray-100 ">Cashier</Chip>
                </div>
                <Button className="mt-6">Submit</Button>
            </Modal>
            <IconButton onClick={onToggle}>
                <HiOutlinePlus className="size-4.5 text-blue-800" />
            </IconButton>
        </>
    )
}