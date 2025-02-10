import { HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineMagnifyingGlass   } from "react-icons/hi2";
import { IconButton } from "../../../components/button";
import Page from "../../../custom-components/table-page";
import Modal from "../components/modal";
import { TextField } from "../../../components/text-field";


export default function () {
    return (
        <Page 
            actions={(
                <>
                    <Modal />
                    <TextField 
                        startIcon={HiOutlineMagnifyingGlass}
                        className="!py-2.5" 
                    />
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronLeft className="size-4.5 text-gray-700" />
                    </IconButton>
                    <IconButton className="bg-white border !shadow-none border-gray-200">
                        <HiOutlineChevronRight className="size-4.5 text-gray-700" />
                    </IconButton>
                </>
            )}
            title="Users" 
            headers={['#', 'Status', 'Customer', 'Cashier', 'Total Discount', 'Gross Sales', 'Net Sales', 'Date & Time']}
        />
    )
}