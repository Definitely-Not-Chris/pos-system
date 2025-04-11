import { useEffect, useState } from "react"
import { HiOutlinePlus, HiPencilSquare } from "react-icons/hi2"
import { Button, IconButton } from "../../../components/button"
import Modal from "../../../components/modal"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterUserSchema, UpdateUserDto, UpdateUserSchema } from "@pos/core/dtos"
import RhfTextField from "../../../custom-components/rhf-text-field"
import RhfChipSelect from "../../../custom-components/rhf-chip-select"
import { useMutation } from "react-query"
import users from "../../../api/users"
import { UserEntity } from "@pos/core/entities/user"
import { omit } from "lodash"

interface Props {
    onSuccess: () => Promise<any>,
    defaultvalues: UserEntity
}


export default function (props: Props) {
    const [open, setOpen] = useState(false)
    const onToggle = () => setOpen(v => !v)

    const { mutateAsync, isLoading } = useMutation((data: UpdateUserDto) => users.post(data))
    const form = useForm<UpdateUserDto>({ 
        defaultValues: omit(props.defaultvalues, 'password'),
        resolver: zodResolver(UpdateUserSchema) 
    })
    const { handleSubmit, reset } = form

    const onSubmit = (data: UpdateUserDto) => {
        mutateAsync(data)
            .then(props.onSuccess)
            .then(() => setOpen(false))
    }

    useEffect(() => {
        reset()
    }, [open])

    return (
        <FormProvider {...form}>
            <Modal 
                open={open}
                onToggle={onToggle}
                title="Update User"
            >
                <form noValidate  
                    className="flex flex-col space-y-2.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <RhfTextField name="firstName" inputProps={{ placeholder: "First Name" }}/>
                    <RhfTextField name="lastName" inputProps={{ placeholder: "Last Name" }}/>
                    <RhfTextField 
                        name="email" 
                        disabled
                        inputProps={{ placeholder: "Email Address" }} 
                        helperText={(error) => error?.type == 'invalid_string'}
                        error={(error) => error?.type == 'invalid_string' ? 'Invalid email format' : error?.message}
                    />
                    <RhfTextField name="password" inputProps={{ placeholder: "Password", type: 'password' }} />
                    <RhfChipSelect name="role" label="Role: " options={['admin', 'invoice', 'payment']} />
                    <Button loading={isLoading} className="mt-6">Submit</Button>
                </form>
            </Modal>
            <div className="flex justify-end">
                <IconButton onClick={onToggle} className="!bg-white !p-1 !rounded-lg !shadow-none group-hover:!shadow"><HiPencilSquare className="text-gray-400/75 size-5 group-hover:text-gray-600"/></IconButton>
            </div>
        </FormProvider>
    )
}