import { useEffect, useRef, useState } from "react"

export const useFetch = (url, options = {}, immediate = false) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const abortControllerRef = useRef(null)


    const executeApiCall = async () => {
        if (!url) {
            setError("Please provide a valid url")
            return;
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        const abortController = new AbortController()
        abortControllerRef.current = abortController

        try {
            setLoading(true)
            const rawData = await fetch(url, { ...options, signal: abortController.signal })
            const data = await rawData.json()
            setData(data)
        } catch (error) {
            if (error.name === "AbortError") {
                setError(null)
                return;
            }
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (immediate) {
            executeApiCall();
        }

        return () => {
            abortControllerRef.current?.abort()
        }
    }, [url, immediate])



    return {
        data,
        loading,
        error
    }

}