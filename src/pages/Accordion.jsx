import { useState } from "react"
import { AccordionComp } from "../components/accordion/AccordionComp"





export const Accordion = () => {


    return (
        <>
            <h1>Accordion</h1>
            <AccordionComp heading="Heading 1" value="1">
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            </AccordionComp>
            <AccordionComp heading="Heading 2" value="2">
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            </AccordionComp>
        </>
    )
}