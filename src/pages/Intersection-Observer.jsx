import { useEffect, useRef, useState } from "react";

function MineIntersectionObserver() {
  const [list, setList] = useState(new Array(20).fill("This is list item"));
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const listRefArray = useRef([]);

  function loadMore() {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      setList((prev) => [...prev, ...new Array(20).fill("new list item")]);
      setLoading(false);
    }, 3000);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        const entry = entries[0];
        if (entry.isIntersecting) {
          observer.unobserve(entries[0].target);
          loadMore();
        }
      },
      {
        root: containerRef.current,
      },
    );
    const lastElementRef = listRefArray.current.at(-1);
    console.log(lastElementRef, listRefArray.current);
    observer.observe(lastElementRef);

    return () => {
        if(lastElementRef){
            observer.unobserve(lastElementRef)
        }

        observer.disconnect()
    }
  }, [list.length]);

  return (
    <div>
      <h1>Intersection Observer</h1>

      <div className="list-container2" ref={containerRef}>
        {list.map((item, index) => (
          <div
            key={index}
            ref={(el) => (listRefArray.current[index] = el)}
            className="list2"
          >
            {`${item} ${index + 1}`}
          </div>
        ))}

        {loading && <div className="list2">Loading...</div>}
      </div>
    </div>
  );
}

export default MineIntersectionObserver;
