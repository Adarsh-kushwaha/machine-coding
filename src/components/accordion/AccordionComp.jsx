import { useState } from "react"
import "./accordion.css"

export const AccordionComp = ({ heading, children }) => {

    const [isOpenItems, setIsOpenItems] = useState(false)

    const handleToggle = () => {
        setIsOpenItems(!isOpenItems)
    }



    return (
        <div className="accordion-item" data-open={isOpenItems}>
            <button className="accordion-item-header" onClick={handleToggle} aria-expanded={isOpenItems} aria-controls="content-1" id="heading-1">
                <h3>{heading}</h3>
                <p>{isOpenItems ? "-" : "+"}</p>
            </button>
            <div className="accordion-item-content-wrapper" aria-hidden={!isOpenItems} id="content-1" role="region" aria-labelledby="heading-1" tabIndex={0}>
                <div className="accordion-item-content" >
                    {children}
                </div>
            </div>
        </div >
    )
}