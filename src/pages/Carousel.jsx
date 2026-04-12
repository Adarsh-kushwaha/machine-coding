import { ReusableCarousel } from "../components/carousel/ReusableCarousel"
import image1 from "../components/carousel/assets/image.jpg"
import image2 from "../components/carousel/assets/image2.jpg"
import image3 from "../components/carousel/assets/image3.jpg"
import image4 from "../components/carousel/assets/image1.jpg"
import image5 from "../components/carousel/assets/image5.jpg"


function Carousel() {
    return (
        <div style={{ width: "100%", height: "100%", minWidth: "500px", minHeight: "500px", left: 0, top: 0, margin: "auto", objectFit: "cover" }} >
            <ReusableCarousel>
                <img src={image1} alt="image1" />
                <img src={image2} alt="image2" />
                <img src={image3} alt="image3" />
                <img src={image4} alt="image4" />
                <img src={image5} alt="image5" />
            </ReusableCarousel>
        </ div>
    )
}

export default Carousel