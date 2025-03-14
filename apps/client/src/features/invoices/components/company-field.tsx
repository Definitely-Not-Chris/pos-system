import { useQuery } from "react-query";
import companiesAPI from "../../../api/companies";
import RhfSelectField from "../../../custom-components/rhf-select-field";
import { CompanyEntity } from "@pos/core/entities";


export default function () {
    const { data, isLoading, refetch } = useQuery('companies', () => companiesAPI.getAll())
    const companies = data?.data || []

    return (
        <RhfSelectField 
            name="company"
            inputProps={{ 
                placeholder: "Bill To",
                options: companies,
                renderId: (data: CompanyEntity) => data?.id,
                renderItem: (data: CompanyEntity) => data?.name,
            }}
        />
    )
}