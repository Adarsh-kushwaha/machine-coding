import { useEffect, useState } from "react"
import "../components/toast/infinte-scroll.css"
import { useFetch } from "../hooks/use-fetch"

export default function InfiniteScroll() {

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const { data } = useFetch("https://jsonplaceholder.typicode.com/posts", {}, true)
    const [counter, setCounter] = useState(10)

    const THRESHOLD = 500

    function loadMore() {
        setLoading(true)
        setTimeout(() => {
            setList((prev) => [...prev, ...data.splice(0, counter)])
            setLoading(false)
        }, 3000)
    }

    useEffect(() => {
        loadMore()
    }, [data, counter])

    useEffect(() => {
        const scrollDom = document.querySelector(".list-container2")
        const handleScroll = () => {
            // console.log(scrollDom.scrollHeight, scrollDom.scrollTop, scrollDom.clientHeight)
            const remainingScroll = scrollDom.scrollHeight - (scrollDom.scrollTop + scrollDom.clientHeight)
            if (remainingScroll < THRESHOLD) {
                setCounter((prev) => prev + 10)
            }

        };

        scrollDom.addEventListener("scroll", handleScroll);

        return () => scrollDom.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div>
            <h1>Infinite Scroll</h1>
            <div className="list-container2" >
                {list?.map((item, index) => {
                    return (
                        <div key={index} className="list2">
                            <h4>{item.title}</h4>
                        </div>
                    )
                })}
                {loading && <div className="list2">Loading...</div>}
            </div>
        </div>
    )
}