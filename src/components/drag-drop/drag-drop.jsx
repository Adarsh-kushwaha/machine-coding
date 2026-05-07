import { useState } from "react";
import "./drag.css";

export const DragDrop = () => {
    const [data, setData] = useState([...Array.from({ length: 50 }, (v, i) => i + 1)]);
    const [startindex, setStartIndex] = useState(-1);
    const [swapIndex, setSwapIndex] = useState(-1);
    const [droppedIndex, setDroppedIndex] = useState(-1);

    const reset = () => {
        setStartIndex(-1);
        setSwapIndex(-1);
    };

    const dragStart = (e, index) => {
        setStartIndex(index);
        e.dataTransfer.effectAllowed = "copy";
    };

    const swapArrayElement = (arr, currentIndex, swapindex) => {
        if (currentIndex >= arr.length || swapIndex >= arr.length || currentIndex < 0 || swapIndex < 0) {
            console.log("Invalid Move")
            return arr;
        }
        const newArr = [...arr];
        newArr.splice(currentIndex, 1);
        newArr.splice(swapIndex, 0, arr[currentIndex])
        return newArr
    }

    console.log(startindex, swapIndex)

    return (
        <>
            <div className="drag-conatiner">
                {data?.map((item, index) => {
                    let cls = "drag-item";

                    if (index === startindex) {
                        cls += " grabbing";
                    }

                    if (index === swapIndex) {
                        cls += " swapping"
                    }

                    if(index === droppedIndex){
                        cls += " bubble"
                    }

                    return (
                        <div
                            draggable="true"
                            key={index}
                            className={cls}
                            onDragStart={(e) => dragStart(e, index)}
                            onDragEnd={reset}
                            onDragOver={(e) => {
                                e.preventDefault()
                                setSwapIndex(index)
                            }}
                            onDrop={(e) => {
                                e.preventDefault()
                                const newArr = [...data];
                                const dropIndex = swapIndex;
                                setData(swapArrayElement(newArr, startindex, dropIndex))
                                setDroppedIndex(dropIndex)

                                setTimeout(() => {
                                    setDroppedIndex(-1)
                                }, 1000)

                                reset()
                            }}
                        >
                            {`This is ${item}`}
                        </div>
                    );
                })}
            </div>
        </>
    );
};
