import { useEffect, useState } from "react"
import { HiPencilSquare } from "react-icons/hi2"
import { Button, IconButton } from "../../../components/button"
import Modal from "../../../components/modal"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateCheckDto, UpdateCheckSchema } from "@pos/core/dtos"
import RhfTextField from "../../../custom-components/rhf-text-field"
import { useMutation } from "react-query"
import users from "../../../api/users"
import { CheckEntity } from "@pos/core/entities"
import { omit } from "lodash"

interface Props {
    onSuccess: () => Promise<any>,
    defaultvalues: CheckEntity
}


export default function (props: Props) {
    const [open, setOpen] = useState(false)
    const onToggle = () => setOpen(v => !v)

    const { mutateAsync, isLoading } = useMutation((data: UpdateCheckDto) => users.post(data))
    const form = useForm<UpdateCheckDto>({ 
        defaultValues: props.defaultvalues,
        resolver: zodResolver(UpdateCheckSchema) 
    })
    const { handleSubmit, reset } = form

    const onSubmit = (data: UpdateCheckDto) => {
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
                    <RhfTextField name="accountNumber" inputProps={{ placeholder: "Account Number" }}/>
                    <RhfTextField name="payee" inputProps={{ placeholder: "Payee" }}/>
                    <RhfTextField name="amount" inputProps={{ placeholder: "Amount", type: 'number' }}/>
                    <RhfTextField name="payerName" inputProps={{ placeholder: "Payer Name" }}/>
                    <RhfTextField name="payerAddress" inputProps={{ placeholder: "Payer Address" }}/>
                    <RhfTextField name="dateIssued" inputProps={{ placeholder: "Date Issued" }}/>
                    <RhfTextField name="routingNumber" inputProps={{ placeholder: "Routing Number" }}/>
                    <RhfTextField name="memoLine" inputProps={{ placeholder: "Memo Line" }}/>
                    <RhfTextField name="bankFractional" inputProps={{ placeholder: "Bank Fractional" }}/>
                    <Button loading={isLoading} className="mt-6">Submit</Button>
                </form>
            </Modal>
            <IconButton onClick={onToggle} className="!bg-white !p-1 !rounded-lg"><HiPencilSquare className="size-5 text-gray-600"/></IconButton>
        </FormProvider>
    )
}