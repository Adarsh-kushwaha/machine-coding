import { useEffect, useRef, useState } from "react"
import "../components/toast/infinte-scroll.css"
import { useFetch } from "../hooks/use-fetch"

export default function InfiniteScroll() {

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const { data } = useFetch("https://jsonplaceholder.typicode.com/posts", {}, true)
    const [counter, setCounter] = useState(10)
    const scrollRef = useRef(null)
    const THRESHOLD = 100

    function loadMore() {
        if (loading) return
        setLoading(true)

        setTimeout(() => {
            setList((prev) => {
                const nextItems = data.slice(prev.length, prev.length + counter)
                return [...prev, ...nextItems]
            })
            setLoading(false)
        }, 1500)
    }

    useEffect(() => {
        if (data && data.length > 0 && list.length === 0) {
            loadMore()
        }
    }, [data])

    useEffect(() => {
        const scrollRefDom = scrollRef.current;
        let throttleTimer = false;

        const handleScroll = () => {
            if (loading || throttleTimer) return;

            throttleTimer = true;
            setTimeout(() => {
                const remainingScroll = scrollRefDom.scrollHeight - (scrollRefDom.scrollTop + scrollRefDom.clientHeight)
                if (remainingScroll < THRESHOLD) {
                    console.log("Threshold reached, loading more...")
                    loadMore()
                }
                throttleTimer = false;
            }, 200); // 200ms throttle
        };

        scrollRefDom.addEventListener("scroll", handleScroll);
        return () => scrollRefDom.removeEventListener("scroll", handleScroll);
    }, [data, counter, loading]);

    return (
        <div>
            <h1>Infinite Scroll</h1>
            <div className="list-container2" ref={scrollRef} >
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