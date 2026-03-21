import { useState } from "react"
import { ListContainer } from "../components/autocomplete/list-container"
import { Search } from "../components/autocomplete/search"
import { useFetch } from "../hooks/use-fetch"
import { useDebounce } from "../hooks/use-debounce"

export const Autocomplete = ({ data, value, onChange, onSelect, loading, error, selectedItem }) => {

    const handleOnClear = () => {
        onChange("")
        onSelect(null)
    }

    return (
        <div className="autocomplete">
            <Search setQuery={onChange} onClear={handleOnClear} query={value} selectedItem={selectedItem} onSelect={onSelect} />
            {!selectedItem.name && value?.length > 0 && <ListContainer data={data} loading={loading} error={error} onSelect={onSelect} />}
        </div>
    )
}