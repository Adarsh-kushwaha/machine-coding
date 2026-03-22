import { CustomTab } from "../components/tabs/CustomTab"

const comp1 = () => {
    return (
        <p>I am comp1</p>
    )
}

const comp2 = () => {
    return (
        <p>I am comp2</p>
    )
}

export const Tabs = () => {

    const tabList = [
        {
            id: 1,
            tab: "Tab 1",
            panel: comp1
        },
        {
            id: 2,
            tab: "Tab 2",
            panel: comp2
        }
    ]


    return (
        <>
            <h1>My Tab</h1>
            <CustomTab tabList={tabList} />
        </>
    )
}