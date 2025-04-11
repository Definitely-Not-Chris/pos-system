import { useEffect, useState } from "react"
import { HiOutlinePlus } from "react-icons/hi2"
import { Button, IconButton } from "../../../components/button"
import Modal from "../../../components/modal"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCompanyDto, CreateCompanySchema } from "@pos/core/dtos"
import RhfTextField from "../../../custom-components/rhf-text-field"
import { useMutation } from "react-query"
import companies from "../../../api/companies"

interface Props {
    onSuccess: () => Promise<any>
}

export default function (props: Props) {
    const [open, setOpen] = useState(false)
    const onToggle = () => setOpen(v => !v)

    const { mutateAsync, isLoading } = useMutation((data: CreateCompanyDto) => companies.post(data))
    const form = useForm<CreateCompanyDto>({ resolver: zodResolver(CreateCompanySchema) })
    const { handleSubmit, reset, formState: { errors } } = form

    const onSubmit = (data: CreateCompanyDto) => {
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
                title="Create Company"
            >
                <form noValidate  
                    className="flex flex-col space-y-2.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <RhfTextField name="name" inputProps={{ placeholder: "Name" }}/>
                    <RhfTextField name="address" inputProps={{ placeholder: "Address" }}/>
                    <RhfTextField name="contactNumber" inputProps={{ placeholder: "Contact Number" }}/>
                    {/* <RhfTextField 
                        name="email" 
                        inputProps={{ placeholder: "Email Address" }} 
                        helperText={(error) => error?.type == 'invalid_string'}
                        error={(error) => error?.type == 'invalid_string' ? 'Invalid email format' : error?.message}
                    />
                    <RhfTextField name="password" inputProps={{ placeholder: "Password", type: 'password' }} />
                    <RhfChipSelect name="role" label="Role: " options={['admin', 'cashier']} /> */}
                    {/* <div>
                        {JSON.stringify(errors)}
                    </div> */}
                    <Button loading={isLoading} className="mt-6">Submit</Button>
                </form>
            </Modal>
            <IconButton onClick={onToggle}>
                <HiOutlinePlus className="size-5 text-blue-600" />
            </IconButton>
        </FormProvider>
    )
}