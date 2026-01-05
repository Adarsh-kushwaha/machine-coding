import { useState } from "react";
import Interest from "../components/multi-form/Interest";
import Profile from "../components/multi-form/Profile";
import Settings from "../components/multi-form/Settings";

const tabConfig = [
  {
    name: "Profile",
    isSelected: true,
    component: <Profile />,
  },
  {
    name: "Interst",
    isSelected: false,
    component: <Interest />,
  },
  {
    name: "Settings",
    isSelected: false,
    component: <Settings />,
  },
];

export default function MultiForm() {
  const [selectedTabConfig, setTabConfig] = useState(tabConfig);

  const selectTabHandler = (name) => {
        setTabConfig(prev => prev.map((t) => ({
            ...t,
            isSelected: name === t.name
        })))
  };



  return (
    <div>
      <div className="tabParent">
        {selectedTabConfig.map((t) => (
          <div className="tab">
            <button
              className={t.isSelected ? "selctedTab" : ""}
              onClick={() => selectTabHandler(t.name)}
            >
              {t.name}
            </button>
          </div>
        ))}
      </div>
      {selectedTabConfig.find((tab) => tab.isSelected)?.component}
    </div>
  );
}
