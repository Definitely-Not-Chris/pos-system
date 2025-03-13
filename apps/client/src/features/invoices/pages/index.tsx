import { HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineMagnifyingGlass, HiOutlinePlus, HiMiniEye  } from "react-icons/hi2";
import { Button, IconButton } from "../../../components/button";
import Page from "../../../custom-components/table-page";
import CreateModal from "../components/create-invoice-modal";
import { TextField } from "../../../components/text-field";
import { useQuery } from "react-query";
import invoicesAPI from "../../../api/invoices";
import moment from "moment";
import Chip from "../../../components/chip";
import Center from "../../../components/center";

import UpdateModal from "../components/update-invoice-modal";
import { InvoiceEntity } from "@pos/core/entities";
import AddTransactionModal from "../components/add-transaction-modal";
import { useNavigate } from "react-router";
import { TableColumns } from "../../../components/table";

export default function () {
    const navigate = useNavigate()
    const { data, isLoading, refetch } = useQuery('invoices', () => invoicesAPI.getAll())
    const invoices = data?.data ?? []

    const columns: TableColumns = [
        'invoiceNumber',
        'name',
        'dateIssued',
        'billTo',
        'amount',
        'paymentDue',
        // {
        //     label: 'role',
        //     render: (value: any) => <Center><Chip variant="primary" size="small">{value.role}</Chip></Center>
        // },
        // {
        //     label: 'dateCreated',
        //     render: (value: any) => moment(value.dateCreated).format('MM-DD hh:mmA')
        // },
        
        {
            className: "!ps-0 !w-20%",
            render: (data: InvoiceEntity) => (
                <div className="flex row justify-end space-x-2 *:group-hover:!shadow *:!shadow-none *:!opacity-50 *:group-hover:!opacity-100">
                    <AddTransactionModal invoice={data} onSuccess={refetch} />
                    <UpdateModal defaultvalues={data} onSuccess={refetch} />
                    <IconButton onClick={() => navigate(data.id.toString())} className="!bg-white !p-1 !rounded-lg"><HiMiniEye  className="size-5 text-gray-600"/></IconButton>
                </div>
            )
        }
    ]

    return (
        <Page 
            actions={(
                <>
                    <div className="flex-1"></div>
                    <TextField 
                        startIcon={HiOutlineMagnifyingGlass}
                        className="!py-2.5"
                        containerClassName="!rounded-2xl" 
                    />
                    <CreateModal onSuccess={refetch} />
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronLeft className="size-4.5 text-gray-700" />
                    </IconButton>
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronRight className="size-4.5 text-gray-700" />
                    </IconButton>
                </>
            )}
            title="Invoices" 
            columns={columns}
            data={invoices}
            loading={isLoading}
        />
    )
}