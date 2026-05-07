import { Carousel } from "../components/carousel/carousel"
import image1 from "../components/carousel/images/image1.jpg"
import image2 from "../components/carousel/images/image2.jpg"
import image3 from "../components/carousel/images/image3.jpg"
import image4 from "../components/carousel/images/image4.jpg"
import image5 from "../components/carousel/images/image5.jpg"

import "../components/carousel/carousel.css"

export const CarouselPage = () => {
    return (
        <div>
            <Carousel>
                <img src={image1} className="img" />
                <img src={image2} className="img" />
                <img src={image3} className="img" />
                <img src={image4} className="img" />
                <img src={image5} className="img" />
            </Carousel>
        </div>
    )
}