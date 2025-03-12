import { useEffect, useState } from "react"
import { HiPencilSquare } from "react-icons/hi2"
import { Button, IconButton } from "../../../components/button"
import Modal from "../../../components/modal"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateInvoiceDto, UpdateInvoiceSchema } from "@pos/core/dtos"
import RhfTextField from "../../../custom-components/rhf-text-field"
import { useMutation } from "react-query"
import users from "../../../api/users"
import { InvoiceEntity } from "@pos/core/entities"

interface Props {
    onSuccess: () => Promise<any>,
    defaultvalues: InvoiceEntity
}


export default function (props: Props) {
    const [open, setOpen] = useState(false)
    const onToggle = () => setOpen(v => !v)

    const { mutateAsync, isLoading } = useMutation((data: UpdateInvoiceDto) => users.post(data))
    const form = useForm<UpdateInvoiceDto>({ 
        defaultValues: props.defaultvalues,
        resolver: zodResolver(UpdateInvoiceSchema) 
    })
    const { handleSubmit, reset } = form

    const onSubmit = (data: UpdateInvoiceDto) => {
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
                title="Update Invoice"
            >
                <form 
                    className="flex flex-col space-y-2.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <RhfTextField name="invoiceNumber" inputProps={{ placeholder: "Invoice Number", type: 'number' }}/>
                    <RhfTextField name="name" inputProps={{ placeholder: "Name" }}/>
                    <RhfTextField name="dateIssued" inputProps={{ placeholder: "Date Issued" }}/>
                    <RhfTextField name="company" inputProps={{ placeholder: "Bill To" }}/>
                    <RhfTextField name="amount" inputProps={{ placeholder: "Amount", type: 'number' }}/>
                    <RhfTextField name="paymentDue" inputProps={{ placeholder: "Payment Due" }}/>
                    <Button loading={isLoading} className="mt-6">Submit</Button>
                </form>
            </Modal>
            <IconButton onClick={onToggle} className="!bg-white !p-1 !rounded-lg"><HiPencilSquare className="size-5 text-gray-600"/></IconButton>
        </FormProvider>
    )
}