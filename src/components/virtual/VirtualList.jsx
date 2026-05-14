import { useState } from "react";
import "./virtualList.css";

export const VirtualList = ({ data }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const CONTAINER_HEIGHT = 500;
  const ROW_HEIGHT = 50;
  const OVERSCAN = 5;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const startIndex = Math.max(Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN, 0)
  const visibileCount = Math.ceil(CONTAINER_HEIGHT / ROW_HEIGHT);
  const endIndex = Math.min(Math.floor(startIndex + visibileCount + OVERSCAN*2), data.length)


  return (
    <div
      onScroll={handleScroll}
      className="list-container"
      style={{ height: `${CONTAINER_HEIGHT}px`, overflowY: "auto" }}
    >
      <div style={{ height: `${ROW_HEIGHT * data.length}px`, }}>
        <div style={{transform: `translateY(${startIndex*ROW_HEIGHT}px)` }}>
          {data.slice(startIndex, endIndex).map((item, index) => {
            return (
              <div className="item" style={{ height: `${ROW_HEIGHT}px` }}>{item}</div>
            )
          })}
        </div>
      </div>

    </div>
  );
};