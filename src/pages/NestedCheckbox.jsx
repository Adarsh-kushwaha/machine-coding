import { useState } from "react";

const CheckboxesData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      { id: 2, label: "Apple" },
      { id: 3, label: "Banana" },
      {
        id: 4,
        label: "Citrus",
        children: [
          { id: 5, label: "Orange" },
          { id: 6, label: "Lemon" },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Vegetables",
    children: [
      { id: 8, label: "Carrot" },
      { id: 9, label: "Broccoli" },
    ],
  },
];

const Checkboxes = ({ data, checkedItem, setCheckedItem }) => {
  const handleChange = (e, node) => {
    const isChecked = e.target.checked;

    //updatechildren
    const updateChildrenIfexist = (node, update) => {
      update[node.id] = isChecked;

      node?.children?.forEach((child) => {
        updateChildrenIfexist(child, update);
      });
    };

    //verify all checked
    const verifyAllChecked = (node, updated) => {
      if (!node.children) {
        return updated[node.id] || false;
      }
      const allChildrenChecked = node.children.every((child) =>
        verifyAllChecked(child, updated)
      );
      updated[node.id] = allChildrenChecked;
      return allChildrenChecked;
    };

    //set state
    setCheckedItem((prev) => {
      const updated = { ...prev };
      updateChildrenIfexist(node, updated);
      CheckboxesData.forEach((node) => verifyAllChecked(node, updated))
      return updated;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <div style={{ paddingLeft: "20px" }} key={node.id}>
          <div style={{ display: "flex", gap: "5px" }}>
            <input
              type="checkbox"
              onChange={(e) => handleChange(e, node)}
              checked={checkedItem[node.id] || false}
            />
            <p>
              {node.label} - {node.id}
            </p>
          </div>
          {node.children && (
            <Checkboxes
              data={node.children}
              checkedItem={checkedItem}
              setCheckedItem={setCheckedItem}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function NestedCheckbox() {
  const [checkedItem, setCheckedItem] = useState({});
  return (
    <div>
      <h2>Nested Checkbox</h2>
      <Checkboxes
        data={CheckboxesData}
        checkedItem={checkedItem}
        setCheckedItem={setCheckedItem}
      />
    </div>
  );
}
