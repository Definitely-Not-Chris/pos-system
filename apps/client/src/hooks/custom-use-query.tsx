import { ReactNode, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { TextField } from "../components/text-field";

interface CustomQueryResult{
    renderSearchField: () => ReactNode,
    search: string,
    searching: boolean
}

interface CustomQueryProps{
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}


const DEBOUNCE_TIME = 500

export default function useSearchQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = any>
(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & CustomQueryProps): UseQueryResult<TData, TError> & CustomQueryResult {
    
    const { search, setSearch } = options
    const [searching, setSearching] = useState<boolean>(false)

    const { ...others } = useQuery({
        ...options,
        keepPreviousData: true,
        staleTime: DEBOUNCE_TIME,
    })

    function renderSearchField() {
        return (
            <TextField 
                startIcon={HiOutlineMagnifyingGlass}
                className="!py-2.5"
                onChange={(e) => {
                    setSearching(true)
                    setTimeout(() => {
                        setSearch(e.target.value)
                        setSearching(false)
                    }, DEBOUNCE_TIME)
                }}
            />
        )
    }

    return {
        renderSearchField,
        search,
        searching,
        ...others,
        isLoading: others.isLoading || searching
    }
}