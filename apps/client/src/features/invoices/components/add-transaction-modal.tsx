import { useEffect, useState } from "react"
import { HiOutlinePlus } from "react-icons/hi2"
import { Button } from "../../../components/button"
import Modal from "../../../components/modal"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTransactionDto, CreateTransactionSchema } from "@pos/core/dtos"
import RhfTextField from "../../../custom-components/rhf-text-field"
import { useMutation } from "react-query"
import RhfSelectField from "../../../custom-components/rhf-select-field"
import clsx from "clsx"
import { InvoiceEntity } from "@pos/core/entities"
import { TextField } from "../../../components/text-field"
import transactions from "../../../api/transactions"

interface Props {
    onSuccess: () => Promise<any>,
    buttonClassname?: string,
    invoice: InvoiceEntity
}

export default function (props: Props) {
    const [open, setOpen] = useState(false)
    const onToggle = () => setOpen(v => !v)

    const { mutateAsync, isLoading } = useMutation((data: CreateTransactionDto) => transactions.post(data))
    const form = useForm<CreateTransactionDto>({ 
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            invoice: props.invoice
        }
    })
    const { handleSubmit, reset, formState: { errors }, watch } = form

    const onSubmit = (data: CreateTransactionDto) => {
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
                title="Add Transaction"
            >
                <form noValidate  
                    className="flex flex-col space-y-2.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField value={`Invoice #${props.invoice.invoiceNumber}`} disabled/>
                    <RhfSelectField 
                        name="type" 
                        inputProps={{ 
                            placeholder: "Type", 
                            options: ['Payment', 'Delivery Receipt'] 
                        }}
                    />
                    <RhfTextField name="amount" inputProps={{ placeholder: "Amount", type: 'number' }}/>
                    <Button loading={isLoading} className="mt-6">Submit</Button>
                </form>
            </Modal>
            <Button 
                onClick={onToggle}
                startIcon={HiOutlinePlus} 
                iconClassName="!text-blue-700"
                className={clsx(props.buttonClassname, '!bg-white !p-0 !px-2 !rounded-lg !text-blue-700')}
            >
                Transaction
            </Button>
        </FormProvider>
    )
}