import { useEffect, useState } from "react"
import { HiPencilSquare } from "react-icons/hi2"
import { Button, IconButton } from "../../../components/button"
import Modal from "../../../components/modal"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateCompanyDto, UpdateCompanySchema } from "@pos/core/dtos"
import RhfTextField from "../../../custom-components/rhf-text-field"
import { useMutation } from "react-query"
import comapnies from "../../../api/companies"
import { CompanyEntity } from "@pos/core/entities"
import { omit } from "lodash"

interface Props {
    onSuccess: () => Promise<any>,
    defaultvalues: CompanyEntity
}


export default function (props: Props) {
    const [open, setOpen] = useState(false)
    const onToggle = () => setOpen(v => !v)

    const { mutateAsync, isLoading } = useMutation((data: UpdateCompanyDto) => comapnies.put(props.defaultvalues.id, data))
    const form = useForm<UpdateCompanyDto>({ 
        defaultValues: props.defaultvalues,
        resolver: zodResolver(UpdateCompanySchema) 
    })
    const { handleSubmit, reset } = form

    const onSubmit = (data: UpdateCompanyDto) => {
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
                title="Update Check"
            >
                <form 
                    className="flex flex-col space-y-2.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <RhfTextField name="name" inputProps={{ placeholder: "Name" }}/>
                    <RhfTextField name="address" inputProps={{ placeholder: "Address" }}/>
                    <RhfTextField name="contactNumber" inputProps={{ placeholder: "Contact Number" }}/>
                    <Button loading={isLoading} className="mt-6">Submit</Button>
                </form>
            </Modal>
            <IconButton onClick={onToggle} className="!bg-white !p-1 !rounded-lg"><HiPencilSquare className="size-5 text-gray-600"/></IconButton>
        </FormProvider>
    )
}