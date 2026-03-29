import { useLayoutEffect, useState } from 'react';
import { usePopover } from '../../provider/PopoverProvider';
import './popover.css';
import { createPortal } from 'react-dom';

function Action({ children }) {
    const { toggleOpen, triggerRef } = usePopover()
    return (
        <button className='popover-action' onClick={() => toggleOpen()} ref={triggerRef}>
            {children}
        </button>
    )
}

function Content({ children, position = "right" }) {
    const { open, contentRef, triggerRef } = usePopover()
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [actualPosition, setActualPosition] = useState(position);

    useLayoutEffect(() => {
        if (open && triggerRef.current && contentRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const contentRect = contentRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            console.log(triggerRect, contentRect, windowWidth, windowHeight)

            let top = 0;
            let left = 0;
            let newPos = position;

            const gap = 10;

            if (position === "right") {
                left = triggerRect.right + gap;
                top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2);

                if (left + contentRect.width > windowWidth) {
                    left = triggerRect.left - contentRect.width - gap;
                    newPos = "left";
                }
            } else if (position === "left") {
                left = triggerRect.left - contentRect.width - gap;
                top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2);

                if (left < 0) {
                    left = triggerRect.right + gap;
                    newPos = "right";
                }
            } else if (position === "top") {
                left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2);
                top = triggerRect.top - contentRect.height - gap;

                if (top < 0) {
                    top = triggerRect.bottom + gap;
                    newPos = "bottom";
                }
            } else if (position === "bottom") {
                left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2);
                top = triggerRect.bottom + gap;

                if (top + contentRect.height > windowHeight) {
                    top = triggerRect.top - contentRect.height - gap;
                    newPos = "top";
                }
            }

            // Boundary checks for top/bottom overflow regardless of primary position
            if (top < 0) top = gap;
            if (top + contentRect.height > windowHeight) top = windowHeight - contentRect.height - gap;
            if (left < 0) left = gap;
            if (left + contentRect.width > windowWidth) left = windowWidth - contentRect.width - gap;

            setCoords({ top, left });
            
            setActualPosition(newPos);
        }
    }, [open, position, triggerRef, contentRef]);

    const className = open ? "popover-content" : "popover-content-hide"

    return createPortal(
        <div
            className={className}
            data-position={actualPosition}
            ref={contentRef}
            style={open ? {
                position: 'fixed',
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                margin: 0,
                zIndex: 1000
            } : {}}
        >
            {children}
        </div>,
        document.body
    )
}

function Popover({ children }) {

    return (
        <div className='popover'>
            {children}
        </div>
    )
}

Popover.Action = Action;
Popover.Content = Content;

export default Popover;