import { useState } from "react";
import "./virtualList.css";

export const VirtualList = ({ data }) => {
  
  const [scrollTop, setScrollTop] = useState(0);

  const CONTAINER_HIEGHT = 500;
  const ROW_HIEGHT = 50;
  const OVERSCAN = 10;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const startIndex = Math.max(Math.floor(scrollTop / ROW_HIEGHT) - OVERSCAN, 0);

  const endIndex = Math.min(
    Math.floor((scrollTop + CONTAINER_HIEGHT) / ROW_HIEGHT) + OVERSCAN,
    data.length,
  );

  const renderedCount = Math.min(Math.floor(CONTAINER_HIEGHT/ROW_HIEGHT) + OVERSCAN, data.length);

  const newEndIndex = Math.min(Math.floor((CONTAINER_HIEGHT + scrollTop)/ ROW_HIEGHT) + OVERSCAN, data.length)

  return (
    <div
      onScroll={handleScroll} 
      className="list-container"
      style={{ height: `${CONTAINER_HIEGHT}px` }}
    >
      <div style={{ height: `${data.length * ROW_HIEGHT}px` }}>
        <div style={{transform:`translateY(${startIndex*ROW_HIEGHT}px)`, height:`${CONTAINER_HIEGHT}px`, background:"#ff9090"}}>
          {data.slice(startIndex, startIndex + renderedCount).map((item, index) => {
            return (
              <div
                className="item"
                key={index}
                style={{
                  height: `${ROW_HIEGHT}px`,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
