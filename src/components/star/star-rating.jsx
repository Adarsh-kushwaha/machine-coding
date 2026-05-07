import { useRef, useState } from "react";
import "./star.css";

export const Star = ({ rating, no0fStar }) => {
  const starArray = Array.from({ length: 5 }, (v, i) => i + 1);

  const [activeindex, setActiveIndex] = useState(-1);
  const [hoverIndex, setActiveHoverIndex] = useState(-1);
  const [ratinVal, setRatingVal] = useState(0);

  const starRef = useRef([]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handleMouseHover = (index) => {
    return () => {
      setActiveHoverIndex(index);
    };
  };

  const handleMouseMove = (e, index) => {
    const { offsetX } = e?.nativeEvent;
    const percentage = offsetX / 50;
    const val = index + (percentage <= 0.5 ? 0.5 : 1);
    console.log(val);
    setRatingVal(val);
  };

  return (
    <div className="star-container">
      {starArray?.map((item, index) => {
        let className = "";
        let dataType = "";

        if (index <= activeindex) {
          className += "active";

          if (activeindex < 2 && activeindex > -1) {
            dataType = "bad";
          } else if (activeindex == 2) {
            dataType = "average";
          } else {
            dataType = "good";
          }
        }

        if (index <= hoverIndex) {
          className += " hover";
        }

        let fillType = "empty";

        if (ratinVal >= index + 1) {
          fillType = "full";
        } else if (ratinVal > index) {
          fillType = "half";
        }

        return (
          <button
            className={`star ${className} ${fillType}`}
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={handleMouseHover(index)}
            onMouseLeave={() => setActiveHoverIndex(-1)}
            data-type={dataType}
            ref={(el) => (starRef[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, index)}
          />
        );
      })}
    </div>
  );
};
