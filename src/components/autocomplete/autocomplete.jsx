import { useEffect, useRef, useState } from "react"
import "./auto.css"

const data = Array.from({ length: 20 }, (v, i) => i + 1)

const baseurl = "https://dummyjson.com/products/search"

export const Autocomplete = () => {

    const [input, setInput] = useState("")
    const [products, setProducts] = useState([])
    const [debouncedVal, setDebouncedVal] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [selected, setSelected] = useState("")

    const containerRef = useRef(null)

    const fetchData = async (query) => {

        if (query === "") {
            return;
        }

        const url = `${baseurl}?q=${query}`
        setIsLoading(true)
        const api = await fetch(url);
        const res = await api.json()
        setProducts(res.products)
        setIsLoading(false)
        console.log(res.products)
    }

    const inputHandler = (e) => {
        setSelected("")
        setInput(e.target.value)
    }

    useEffect(() => {
        fetchData(debouncedVal)
    }, [debouncedVal])

    useEffect(() => {

        let timer = setTimeout(() => {
            setDebouncedVal(input)
        }, 300)

        return () => {
            clearTimeout(timer)
        }


    }, [input])

    const handleSelect = (name) => {
        setInput(name);
        setSelected(name)
    }

    useEffect(() => {
        const hanndleClickOutside = (e) => {
            console.log(e.target, containerRef.current)
            if(containerRef.current && !containerRef.current.contains(e.target)){
                setSelected("")
                setProducts([])
                console.log("hello")
            }
        }

        document.addEventListener("mousedown", hanndleClickOutside);

        return () => {
            document.removeEventListener("mousedown", hanndleClickOutside)
        }
    },[])


    return (
        <div  style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "8px", background:"#b82626" }}>
            <input type="text" className="input" onChange={inputHandler} value={input} />
            <div ref={containerRef}>
                {!selected &&  products.length > 0 ? (
                    <div className="auto-list-container">
                        {products?.map((item, index) => {
                            return (
                                <button className="auto-list" key={index} onClick={() => handleSelect(item.title)}>{item.title}</button>
                            )
                        })}
                    </div>
                ) : isLoading === true ? <div>Loading....</div> : !selected ? "No data availbke" : ""}
            </div>
        </div>
    )
}