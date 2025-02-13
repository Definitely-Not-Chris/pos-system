import { useState } from "react"
import { HiOutlinePlus } from "react-icons/hi2"
import { Button, IconButton } from "../../../components/button"
import Modal from "../../../components/modal"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterUserDto, RegisterUserSchema } from "@pos/core/dtos"
import RhfTextField from "../../../custom-components/rhf-text-field"
import RhfChipSelect from "../../../custom-components/rhf-chip-select"
import { useMutation } from "react-query"
import users from "../../../api/users"

export default function () {
    const [open, setOpen] = useState(false)
    const onToggle = () => setOpen(v => !v)

    const { mutateAsync } = useMutation(users.post)
    const form = useForm<RegisterUserDto>({ resolver: zodResolver(RegisterUserSchema) })
    const { handleSubmit, formState: { errors } } = form

    const onSubmit = (data: RegisterUserDto) => {
        return mutateAsync(data)
    }

    return (
        <FormProvider {...form}>
            <Modal 
                open={open}
                onToggle={onToggle}
                title="Create User"
            >
                <form 
                    className="flex flex-col space-y-2.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <RhfTextField name="firstName" inputProps={{ placeholder: "First Name" }}/>
                    <RhfTextField name="lastName" inputProps={{ placeholder: "Last Name" }}/>
                    <RhfTextField name="email" inputProps={{ placeholder: "Email Address" }} />
                    <RhfChipSelect name="role" label="Role: " options={['admin', 'cashier']} />
                    <div>
                        {JSON.stringify(errors)}
                    </div>
                    <Button className="mt-6">Submit</Button>
                </form>
            </Modal>
            <IconButton onClick={onToggle}>
                <HiOutlinePlus className="size-4.5 text-blue-800" />
            </IconButton>
        </FormProvider>
    )
}