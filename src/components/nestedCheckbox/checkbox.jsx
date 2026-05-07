import { useState } from "react"
import { Tree } from "./tree"

const RawCityData = [
    {
        "type": "state",
        "name": "Maharashtra",
        "children": [
            { "type": "city", "name": "Mumbai" },
            { "type": "city", "name": "Pune" },
            { "type": "city", "name": "Nagpur" },
            { "type": "city", "name": "Nashik" }
        ]
    },
    {
        "type": "state",
        "name": "Karnataka",
        "children": [
            { "type": "city", "name": "Bengaluru" },
            { "type": "city", "name": "Mysuru" },
            { "type": "city", "name": "Mangaluru" },
            { "type": "city", "name": "Hubballi" }
        ]
    },
    {
        "type": "state",
        "name": "Tamil Nadu",
        "children": [
            { "type": "city", "name": "Chennai" },
            { "type": "city", "name": "Coimbatore" },
            { "type": "city", "name": "Madurai" },
            { "type": "city", "name": "Salem" }
        ]
    },
    {
        "type": "state",
        "name": "Uttar Pradesh",
        "children": [
            { "type": "city", "name": "Lucknow" },
            { "type": "city", "name": "Kanpur" },
            { "type": "city", "name": "Varanasi" },
            { "type": "city", "name": "Agra" },
            { "type": "city", "name": "Noida" }
        ]
    },
    {
        "type": "state",
        "name": "Gujarat",
        "children": [
            { "type": "city", "name": "Ahmedabad" },
            { "type": "city", "name": "Surat" },
            { "type": "city", "name": "Vadodara" },
            { "type": "city", "name": "Rajkot" }
        ]
    },
    {
        "type": "state",
        "name": "Rajasthan",
        "children": [
            { "type": "city", "name": "Jaipur" },
            { "type": "city", "name": "Udaipur" },
            { "type": "city", "name": "Jodhpur" },
            { "type": "city", "name": "Kota" }
        ]
    },
    {
        "type": "state",
        "name": "West Bengal",
        "children": [
            { "type": "city", "name": "Kolkata" },
            { "type": "city", "name": "Howrah" },
            { "type": "city", "name": "Durgapur" },
            { "type": "city", "name": "Siliguri" }
        ]
    },
    {
        "type": "state",
        "name": "Punjab",
        "children": [
            { "type": "city", "name": "Ludhiana" },
            { "type": "city", "name": "Amritsar" },
            { "type": "city", "name": "Jalandhar" },
            { "type": "city", "name": "Patiala" }
        ]
    },
    {
        "type": "state",
        "name": "Haryana",
        "children": [
            { "type": "city", "name": "Gurugram" },
            { "type": "city", "name": "Faridabad" },
            { "type": "city", "name": "Panipat" },
            { "type": "city", "name": "Ambala" }
        ]
    },
    {
        "type": "state",
        "name": "Madhya Pradesh",
        "children": [
            { "type": "city", "name": "Bhopal" },
            { "type": "city", "name": "Indore" },
            { "type": "city", "name": "Gwalior" },
            { "type": "city", "name": "Jabalpur" }
        ]
    }
]

export const NestedCheckbox = () => {

    const [cityData, setCityData] = useState(RawCityData)

    const expansionHandler = (path) => {
        return () => {
            const indexes = path.split("/")
            const newCityData = structuredClone(cityData)
            console.log(indexes)
            const parentArray = indexes.slice(0, -1).reduce((acc, next) => {
                return acc[next].children;
            }, newCityData)

            console.log(parentArray)

            const targetIndex = indexes.at(-1);
            const targetNode = parentArray[targetIndex]

            console.log(targetNode)

            targetNode.isExpanded = !targetNode.isExpanded
            setCityData(newCityData)
        }
    }


    const checkHandler = (path) => {
        return () => {
            const indexes = path.split("/")
            const newCityData = structuredClone(cityData)
            console.log(indexes)
            const parentArray = indexes.slice(0, -1).reduce((acc, next) => {
                return acc[next].children;
            }, newCityData)

            console.log(parentArray)

            const targetIndex = indexes.at(-1);
            const targetNode = parentArray[targetIndex];

            console.log(targetNode)
            if(targetNode.type === "city"){
                   targetNode.isChecked = !targetNode.isChecked;
            }
         
            if(targetNode.type === "state"){
                const childrenNode = targetNode.children;
                childrenNode.forEach(element => {
                    element.isChecked = !element.isChecked 
                });

            }

            setCityData(newCityData)
        }
    }

    return (
        <>
            <Tree data={cityData} handleExpand={expansionHandler} handleChecked={checkHandler} />
        </>
    )
}