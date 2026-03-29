import { useState } from "react"
import { ReusableDialog } from "../components/Dialog/ReusableDialog"

export const Dialog = () => {
    const [showDialog, setShowDialog] = useState(false)

    const handleOpenDialog = () => {
        setShowDialog(!showDialog)
    }

    const handleCloseDialog = () => {
        setShowDialog(false)
    }

    return (
        <>
        <div><button onClick={handleOpenDialog}>Click here</button></div>
            {showDialog && (<ReusableDialog onClose={handleCloseDialog } >
                <h1>Hello,</h1>
                <p>I am Dialog</p>
            </ReusableDialog>)}
        </>
    )
}