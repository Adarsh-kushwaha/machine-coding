import { useEffect, useRef, useState } from "react"

function MineIntersectionObserver() {
    const [list, setList] = useState(new Array(20).fill("This is list item"))
    const [loading, setLoading] = useState(false)
    const elementRef = useRef([])

    const THRESHOLD = 1000

    function loadMore() {
        setLoading(true)
        setTimeout(() => {
            setList((prev) => [...prev, ...new Array(20).fill("This is infinite scroll item")])
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(function (entries) {
            console.log(entries[0].isIntersecting)
            if (entries[0].isIntersecting) {
                observer.unobserve(entries[0].target);
                loadMore()
            }
        })
        const lastSecondElement = elementRef.current[elementRef.current.length - 2]
        observer.observe(lastSecondElement)

        return () => {
            observer.disconnect();
        }
    }, [list.length])

    return (
        <div>
            <h1>Intersection Observer</h1>
            <div className="list-container">
                {list.map((item, index) => {
                    return (
                        <div ref={(el) => { elementRef.current[index] = el }} key={index} className="list">
                            {`${item} ${index + 1}`}
                        </div>
                    )
                })}
                {loading && <div className="list">Loading...</div>}
            </div>
        </div>
    )
}

export default MineIntersectionObserver