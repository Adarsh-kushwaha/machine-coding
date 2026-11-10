import { useEffect, useRef, useState } from "react"
import { Autocomplete } from "../components/autocomplete/autocomplete"

export const AucompletePage = () => {

    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    const cachedRef = useRef(new Map())
    const abortRef = useRef(null)

    const baseUrl = `https://dummyjson.com/products/search`

    const callProductApi = async (query) => {
        const key = query.trim().toLowerCase();
        abortRef.current?.abort()
        const controller = new AbortController();
        abortRef.current = controller;


        if (cachedRef.current.has(key)) {
            setSuggestions(cachedRef.current.get(key))
            return
        }

        try {
            setLoading(true)
            const res = await fetch(`${baseUrl}?q=${query}`, { signal: controller.signal })
            const data = await res.json()
            setLoading(false)
            const products = data?.products?.map((item) => item?.title)
            cachedRef.current.set(key, products)
            setSuggestions(products)
        } catch (error) {
            console.log(error)
        }



    }

    const onChange = (value) => {
        console.log("making api call", value)
        callProductApi(value)
    }


    return (
        <div>
            <Autocomplete isDebouncedInput={true} suggestions={suggestions} onChange={onChange} isLoading={loading} />
        </div>
    )
}