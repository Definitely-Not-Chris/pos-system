import { useEffect, useState } from "react"
import { HiOutlinePlus } from "react-icons/hi2"
import { Button, IconButton } from "../../../components/button"
import Modal from "../../../components/modal"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateInvoiceDto, CreateInvoiceSchema } from "@pos/core/dtos"
import RhfTextField from "../../../custom-components/rhf-text-field"
import { useMutation } from "react-query"
import invoices from "../../../api/invoices"
import RhfSelectField from "../../../custom-components/rhf-select-field"

interface Props {
    onSuccess: () => Promise<any>
}

export default function (props: Props) {
    const [open, setOpen] = useState(false)
    const onToggle = () => setOpen(v => !v)

    const { mutateAsync, isLoading } = useMutation((data: CreateInvoiceDto) => invoices.post(data))
    const form = useForm<CreateInvoiceDto>({ resolver: zodResolver(CreateInvoiceSchema) })
    const { handleSubmit, reset, formState: { errors }, watch } = form

    const onSubmit = (data: CreateInvoiceDto) => {
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
                title="Create Invoice"
            >
                <form 
                    className="flex flex-col space-y-2.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <RhfTextField name="invoiceNumber" inputProps={{ placeholder: "Invoice Number", type: 'number' }}/>
                    <RhfTextField name="name" inputProps={{ placeholder: "Name" }}/>
                    <RhfTextField name="dateIssued" inputProps={{ placeholder: "Date Issued" }}/>
                    <RhfSelectField 
                        name="companyId" 
                        inputProps={{ 
                            placeholder: "Bill To", 
                            options: ['Jollibee', 'Mcdo', 'Mang Inasal'] 
                        }}
                    />
                    <RhfTextField name="paymentDue" inputProps={{ placeholder: "Payment Due" }}/>
                    <Button loading={isLoading} className="mt-6">Submit</Button>
                </form>
            </Modal>
            <IconButton onClick={onToggle}>
                <HiOutlinePlus className="size-5 text-blue-600" />
            </IconButton>
        </FormProvider>
    )
}