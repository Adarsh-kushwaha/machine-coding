import { useEffect, useState } from "react"
import "./tab.css"

export const CustomTab = ({ tabList }) => {

    const [activeTab, setActiveTab] = useState(1)


    const handleActiveTab = (id) => {
        setActiveTab(id)
    }

    return (
        <div className="tab-container">
            <div className="tablist-container" role="tablist" >
                {tabList.map((tab) => (
                    <button key={tab.id} onClick={() => handleActiveTab(tab.id)} data-selected={activeTab === tab.id} aria-controls={`content${activeTab}`} id={`tablist${activeTab}`} tabIndex={activeTab === tab.id ? 0 : -1} aria-selected={activeTab === tab.id}>{tab.tab}</button>
                ))}

            </div>
            <div className="tab-content" id={`content${activeTab}`} role="tabpanel" tabIndex={0} aria-labelledby={`tablist${activeTab}`}>
                {tabList.map((tab) => (
                    activeTab === tab.id && <tab.panel key={tab.id} />
                ))}
            </div>
        </div>
    )
}