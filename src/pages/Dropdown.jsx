import { useState } from "react";
import { NestedDropDown } from "../components/dropdown/NestedDropDown"

const menuData = [
    {
        id: 1,
        label: "File",
    },
    {
        id: 2,
        label: "Edit",
    },
    {
        id: 3,
        label: "setting",
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
        handleCloseDialog()
    }


    return (
        <>
            <button onClick={handleOpenDialog}>Menu</button>
            {showDialog && <NestedDropDown data={menuData} onSelect={handleSelect} onClose={handleCloseDialog} />}
        </>
    )
}