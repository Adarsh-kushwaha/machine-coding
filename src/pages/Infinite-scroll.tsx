import { useState } from "react"
import "../components/toast/infinte-scroll.css"

export default function InfiniteScroll() {

    const [list, setList] = useState(new Array(50).fill("This is list item"))
    const [loading, setLoading] = useState(false)

    const THRESHOLD = 1000

    function loadMore() {
        setLoading(true)
        setTimeout(() => {
            setList((prev) => [...prev, ...new Array(50).fill("This is infinite scroll item")])
            setLoading(false)
        }, 1000)
    }

    function handleScroll(e: any) {
        const scrollHeight = e.target.scrollHeight
        const scrollTop = e.target.scrollTop
        const clientHeight = e.target.clientHeight

        const remainingScroll = scrollHeight - (clientHeight + scrollTop)
        console.log(remainingScroll)

        if (remainingScroll < THRESHOLD && !loading) {
            loadMore()
        }

    }


    return (
        <div>
            <h1>Infinite Scroll</h1>
            <div className="list-container" onScroll={handleScroll}>
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list">
                            {`${item} ${index + 1}`}
                        </div>
                    )
                })}
                {loading && <div className="list">Loading...</div>}
            </div>
        </div>
    )
}