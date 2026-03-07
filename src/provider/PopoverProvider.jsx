import React, { useRef, useState } from "react";

const PopoverContext = React.createContext();


export const PopoverProvider = ({ children }) => {

    const [open, setOpen] = useState(false);
    const contentRef = useRef();
    const triggerRef = useRef();

    function toggleOpen() {
        setOpen((prev) => !prev)
    }

    return (
        <PopoverContext.Provider value={{ open, toggleOpen, contentRef, triggerRef }}>
            {children}
        </PopoverContext.Provider>
    )
}



export const usePopover = () => {
    return React.useContext(PopoverContext);
}