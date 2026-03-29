import { useState } from "react";
import { NestedDropDown } from "../components/dropdown/NestedDropDown"

const menuData = [
    {
        label: "File",
        children: [
            { label: "New" },
            { label: "Open" },
            {
                label: "Recent",
                children: [
                    { label: "Project A" },
                    { label: "Project B" },
                ],
            },
        ],
    },
    {
        label: "Edit",
        children: [
            { label: "Undo" },
            { label: "Redo" },
        ],
    },
];


export const DropDown = () => {

    const [showDialog, setShowDialog] = useState(false)

    const handleOpenDialog = () => {
        setShowDialog(!showDialog)
    }

    const handleCloseDialog = () => {
        setShowDialog(false)
    }

    const handleSelect = (item) => {
        console.log(`Selected => ${item}`)
    }


    return (
        <>
            <button onClick={handleOpenDialog}>Menu</button>
            {showDialog && <NestedDropDown data={menuData} onSelect={handleSelect} />}
        </>
    )
}