import Popover from "../components/popover"

function PopoverRender() {
    return (

        <div className="popover-container">
            <Popover>
                <Popover.Action>
                    Click Me
                </Popover.Action>
                <Popover.Content>
                    <p>This is the content of the popover</p>
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </Popover.Content>
            </Popover>
        </div>
    )
}

export default PopoverRender