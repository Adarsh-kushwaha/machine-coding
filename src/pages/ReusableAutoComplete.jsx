import { useFetch } from "../hooks/use-fetch";
import { Autocomplete } from "./Autocomplete";
import { useState } from "react";
import { useDebounce } from "../hooks/use-debounce";

export default function ReusableAutoComplete() {
    const [inputValue, setInputValue] = useState("")
    const debouncedQuery = useDebounce(inputValue, 300);
    const [selectedItem, setSelectedItem] = useState("")

    const url = `https://dummyjson.com/recipes/search?q=${debouncedQuery}`

    const { data, loading, error } = useFetch(url, {}, !selectedItem.name && debouncedQuery.length > 0)

    const handleSelect = (item) => {
        setSelectedItem(item);
        setInputValue(item.name)
    }


    return (
        <div>
            <Autocomplete data={data?.recipes} value={inputValue} onChange={setInputValue} onSelect={handleSelect} loading={loading} error={error} selectedItem={selectedItem} />
        </div>
    )
}