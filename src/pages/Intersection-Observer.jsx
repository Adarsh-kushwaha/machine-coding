import { useRef, useState } from "react"
import { useIntersectionObserver } from "../hooks/use-intersection-observer"

function MineIntersectionObserver() {
    const [list, setList] = useState(new Array(20).fill("This is list item"))
    const [loading, setLoading] = useState(false)
    const lastSecondElementRef = useRef(null)

    const THRESHOLD = 1000

    function loadMore() {
        if (loading) return;
        setLoading(true)
        setTimeout(() => {
            setList((prev) => [...prev, ...new Array(20).fill("This is infinite scroll item")])
            setLoading(false)
        }, 1000)
    }

    useIntersectionObserver({
        targetRef: lastSecondElementRef,
        onIntersect: loadMore,
        enabled: !loading,
        options: {
            root: document.querySelector(".list-container2")
        }
    })

    return (
        <div>
            <h1>Intersection Observer</h1>
            <div className="list-container2">
                {list.map((item, index) => {
                    return (
                        <div
                            ref={index === list.length - 2 ? lastSecondElementRef : null}
                            key={index}
                            className="list2"
                        >
                            {`${item} ${index + 1}`}
                        </div>
                    )
                })}
                {loading && <div className="list2">Loading...</div>}
            </div>
        </div>
    )
}

export default MineIntersectionObserver