import { useState } from "react";
import "./virtual.css"

const LIST_CONTAINER_HIEGHT = 600;
const ROW_HIEGHT = 50;
const OVERSCAN_COUNT = 5;

export default function Virtualised({ data, render }) {

    const [scrollTop, setScrollTop] = useState(0)

    const listContainerHieght = LIST_CONTAINER_HIEGHT;
    const rowHeight = ROW_HIEGHT;
    const overscan = OVERSCAN_COUNT;

    const startIndex = Math.max(Math.floor((scrollTop / rowHeight) - overscan), 0)
    const lastIndex = Math.min(Math.floor((scrollTop + listContainerHieght) / rowHeight) + overscan, data.length)

    let renderedCount = Math.floor(listContainerHieght / rowHeight) + overscan;

    renderedCount = Math.min(renderedCount, data.length);

    console.log(renderedCount)


    const handleScroll = (e) => {
        setScrollTop(e.target.scrollTop)
    }


    return (
        <div className="virtualised-container" style={{ height: `${listContainerHieght}px` }} onScroll={handleScroll}>
            <div style={{ height: `${data.length * rowHeight}px` }}>

                {/* //in this we are changing top position of element which is expansive operation

                {data?.slice(startIndex, lastIndex).map((item, index) => (
                    <div className="virtual-list" key={index} style={{ height: `${rowHeight}px`, top: `${(index + startIndex) * rowHeight}px` }}>{render(item)}</div>
                ))} */}




                {/* //in this we are using transform property which is less expansive operation */}
                <div style={{ transform: `translateY(${startIndex * rowHeight}px)` }}>
                    {data?.slice(startIndex, startIndex + renderedCount).map((item, index) => (
                        <div className="virtual-list" key={index} style={{ height: `${rowHeight}px`, top: `${(index + startIndex) * rowHeight}px` }}>{render(item)}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}