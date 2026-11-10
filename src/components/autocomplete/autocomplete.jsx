import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import "./auto.css"
import InputText from "./input"
import Button from "./button"
import Suggestion from "./suggestion"

function debounce(callback, delay) {
    let timeOutId = ""
    return function (...args) {
        clearTimeout(timeOutId)
        timeOutId = setTimeout(() => {
            callback(...args)
        }, delay)
    }
}


export const Autocomplete = ({ suggestions, onChange = () => { }, isLoading, isDebouncedInput }) => {

    const [query, setQuery] = useState("");
    const [showList, setShowList] = useState(false);

    //const debouncedFunction = useCallback(debounce(onChange, 300), [])
    const debouncedFunction = useMemo(() => debounce(onChange, 300), [onChange])

    const manageDebounced = (value) => {
        if(isDebouncedInput){
            debouncedFunction(value)
        }else{
            onChange(value)
        }
    }

    const onQueryChange = (value) => {
        setQuery(value)
        setShowList(true);
        manageDebounced(value)
    }

    const handleClear = () => {
        setQuery("")
    }

    const handleSelect = (item) => {
        setQuery(item);
        manageDebounced(item)
        setShowList(false);
    }

    const filteredSuggestions = suggestions?.filter((sug) => {
        return sug?.toLowerCase()?.includes(query?.toLowerCase());
    })


    return (
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="auto-input">
                <InputText value={query} onChange={onQueryChange} />
                <Button label={"clear"} onClick={handleClear} />
            </div>
            {!!showList && query.length > 0 && <Suggestion isLoading={isLoading} suggestions={filteredSuggestions} onSelect={handleSelect} query={query} />}
        </div>
    )
}