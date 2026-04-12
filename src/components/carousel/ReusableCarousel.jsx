import { useEffect, useRef, useState } from "react"
import "./style.css"

export const ReusableCarousel = ({ children }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const carouselImagesref = useRef(0);
    const intervalRef = useRef(0);

    function getSlideInfo() {
        const slides = carouselImagesref.current.children;
        const slidesCount = slides.length;
        return { slides, slidesCount }
    }

    function startCarousel() {
        intervalRef.current = setInterval(() => {
            setActiveImageIndex((prev) => {
                const slides = carouselImagesref.current.children;
                const slidesCount = slides.length;
                const newIndex = prev === slidesCount - 1 ? 0 : prev + 1;

                // [...slides].forEach((slide, index) => {
                //     slide.setAttribute("data-active", index === newIndex)
                // })

                const currentSlide = slides[prev];
                const nextSlide = slides[newIndex];

                currentSlide.classList.add("hide");
                currentSlide.classList.remove("show");

                nextSlide.classList.add("show");
                nextSlide.classList.remove("hide");

                return newIndex
            });

        }, 3000)
    }

    useEffect(() => {
        startCarousel()
    }, [])

    function handleNext() {
        clearInterval(intervalRef.current);
        setActiveImageIndex((prev) => {
            const { slides, slidesCount } = getSlideInfo();
            const newIndex = prev === slidesCount - 1 ? 0 : prev + 1;

            const currentSlide = slides[prev];
            const nextSlide = slides[newIndex];

            currentSlide.classList.add("hide");
            currentSlide.classList.remove("show");

            nextSlide.classList.add("show");
            nextSlide.classList.remove("hide");

            // [...slides].forEach((slide, index) => {
            //     slide.setAttribute("data-active", index === newIndex)
            // })

            startCarousel()
            return newIndex
        });
    }

    function handlePrevious() {
        clearInterval(intervalRef.current);
        setActiveImageIndex((prev) => {
            const { slides, slidesCount } = getSlideInfo();
            const newIndex = prev === 0 ? slidesCount - 1 : prev - 1;

            const currentSlide = slides[prev];
            const nextSlide = slides[newIndex];

            currentSlide.classList.add("hide");
            currentSlide.classList.remove("show");

            nextSlide.classList.add("show");
            nextSlide.classList.remove("hide");



            // [...slides].forEach((slide, index) => {
            //     slide.setAttribute("data-active", index === newIndex)
            // })
            startCarousel()
            return newIndex
        });
    }

    function handleDotClick(index) {
        clearInterval(intervalRef.current);
        setActiveImageIndex((prev) => {
            const { slides, slidesCount } = getSlideInfo();
            const newIndex = index;

            const currentSlide = slides[prev];
            const nextSlide = slides[newIndex];

            currentSlide.classList.add("hide");
            currentSlide.classList.remove("show");

            nextSlide.classList.add("show");
            nextSlide.classList.remove("hide");

            // [...slides].forEach((slide, index) => {
            //     slide.setAttribute("data-active", index === newIndex)
            // })

            startCarousel()
            return newIndex
        });
    }

    function handMouseOver() {
        clearInterval(intervalRef.current);
    }

    function handleMouseLeave() {
        startCarousel()
    }

    return (
        <div className="carousel-container" onMouseOver={handMouseOver} onMouseLeave={handleMouseLeave}>
            <div className="carousel-images" ref={carouselImagesref}>
                {children}
            </div>
            <div className="carousel-buttons">
                <button onClick={handlePrevious}>⬅️</button>
                <button onClick={handleNext}>➡️</button>
            </div>
            <div className="carousel-dots">
                {Array.from({ length: children.length }).map((_, index) => {
                    return (
                        <button key={index} onClick={() => handleDotClick(index)}>
                            {index + 1}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}