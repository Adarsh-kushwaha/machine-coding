import { useEffect, useRef, useState } from "react";
import "./InfiniteScroll.css";

export const InfiniteScroll = () => {
  const [data, setData] = useState([...new Array(40)]);
  const [loading, setLoading] = useState(false);
  const listref = useRef([]);

  function loadMore() {
    console.log("calling load more....")
    setLoading(true);
    setTimeout(() => {
      setData((prev) => [...prev, ...new Array(10)]);
      setLoading(false);
    }, 1000);
  }

  //   const handleScroll = (e) => {
  //     const scrollTop = e.target.scrollTop;
  //     const scrollHeight = e.target.scrollHeight;
  //     const clientHeight = e.target.clientHeight;

  //     const remainingScroll = scrollHeight - (scrollTop + clientHeight);

  //     if (remainingScroll < 100) {
  //       console.log("calling load more");
  //       loadMore();
  //     }
  //   };

  useEffect(() => {
    const lastElementref = listref.current.at(-1);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          loadMore();
           observer.unobserve(lastElementref);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "100px",
        root: document.querySelector(".scroll-conatiner"),
      },
    );

    observer.observe(lastElementref);

    return () => {
      observer.unobserve(lastElementref);
      observer.disconnect();
    };
  }, [data]);

  return (
    <div className="scroll-conatiner">
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            ref={(el) => (listref.current[index] = el)}
            className="item"
          >{`This is ${index}`}</div>
        );
      })}
      {loading && <div className="item">{`Loading data...`}</div>}
    </div>
  );
};
