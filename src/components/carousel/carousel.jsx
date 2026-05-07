import { useEffect, useRef, useState } from "react";
import "./carousel.css";

export const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagesRef = useRef();
    let intervalRef = useRef();

    function getSlideInfo() {
        const slides = imagesRef.current.children;
        const count = [...slides].length;

        return { slides, count };
    }

    function startInterval() {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => {
                const slides = imagesRef.current.children;
                const count = slides.length;

                const newIndex = prev === count - 1 ? 0 : prev + 1;

                [...slides]?.forEach((slide, index) => {
                    slide.setAttribute("data-active", index === newIndex);
                });

                return newIndex;
            });
        }, 3000);
    }

    useEffect(() => {
        const { slides } = getSlideInfo();
        slides[0].setAttribute("data-active", true);

        startInterval();
    }, []);

    const prevHandler = () => {
        clearInterval(intervalRef.current);

        const { slides, count } = getSlideInfo();

        setCurrentIndex((prev) => {
            const prevSlideIndex = prev === 0 ? count - 1 : prev - 1;

            [...slides]?.forEach((slide, index) => {
                slide.setAttribute("data-active", index === prevSlideIndex);
            });

            return prevSlideIndex;
        });
        startInterval();
    };

    const nextHandler = () => {
        clearInterval(intervalRef.current);

        const { slides, count } = getSlideInfo();

        setCurrentIndex((prev) => {
            const nextSlideIndex = prev === count - 1 ? 0 : prev + 1;

            [...slides]?.forEach((slide, index) => {
                slide.setAttribute("data-active", index === nextSlideIndex);
            });

            return nextSlideIndex;
        });
        startInterval();
    };


    const handleStepperClick = (index) => {
        clearInterval(intervalRef.current);
        const { slides } = getSlideInfo();

        setCurrentIndex((prev) => {
            [...slides]?.forEach((slide, id) => {
                slide.setAttribute("data-active", id === index);
            });
            return index
        })

        startInterval()

    }

    return (
        <div className="carousel-container">
            <div
                className="box"
                ref={imagesRef}
                onMouseEnter={() => clearInterval(intervalRef.current)}
                onMouseLeave={() => startInterval()}
            >
                {children}
            </div>
            <button onClick={prevHandler} className="prev">{`<`}</button>
            <button onClick={nextHandler} className="next">{`>`}</button>
            <div className="stepper">
                {Array.from(children).map((_, index) => (
                    <button key={index} onClick={() => handleStepperClick(index)} >
                        {index}
                    </button>
                ))}
            </div>
        </div>
    );
};
