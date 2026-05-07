import { useState } from "react";
import { Tree } from "./tree";

export const data = [
  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [
          {
            type: "folder",
            name: "common",
            children: [
              {
                type: "folder",
                name: "Button",
                children: [
                  { type: "file", name: "Button.js", children: [] },
                  { type: "file", name: "Button.styles.css", children: [] },
                  { type: "file", name: "Button.test.js", children: [] },
                ],
              },
              {
                type: "folder",
                name: "Input",
                children: [
                  { type: "file", name: "Input.js", children: [] },
                  { type: "file", name: "Input.styles.css", children: [] },
                ],
              },
            ],
          },
          {
            type: "folder",
            name: "layout",
            children: [
              {
                type: "folder",
                name: "Header",
                children: [
                  { type: "file", name: "Header.js", children: [] },
                  { type: "file", name: "Header.styles.css", children: [] },
                ],
              },
              {
                type: "folder",
                name: "Sidebar",
                children: [
                  { type: "file", name: "Sidebar.js", children: [] },
                  {
                    type: "folder",
                    name: "SidebarItem",
                    children: [
                      { type: "file", name: "SidebarItem.js", children: [] },
                      {
                        type: "file",
                        name: "SidebarItem.styles.css",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "folder",
            name: "features",
            children: [
              {
                type: "folder",
                name: "Auth",
                children: [
                  {
                    type: "folder",
                    name: "Login",
                    children: [
                      { type: "file", name: "LoginForm.js", children: [] },
                      {
                        type: "file",
                        name: "Login.validation.js",
                        children: [],
                      },
                    ],
                  },
                  {
                    type: "folder",
                    name: "Signup",
                    children: [
                      { type: "file", name: "SignupForm.js", children: [] },
                    ],
                  },
                ],
              },
              {
                type: "folder",
                name: "Dashboard",
                children: [
                  {
                    type: "folder",
                    name: "Widgets",
                    children: [
                      {
                        type: "folder",
                        name: "Chart",
                        children: [
                          { type: "file", name: "Chart.js", children: [] },
                          {
                            type: "folder",
                            name: "hooks",
                            children: [
                              {
                                type: "file",
                                name: "useChartData.js",
                                children: [],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const NestedFolder = () => {
  const [fileExplorerData, setFileExplorerData] = useState(
    structuredClone(data),
  );

  const expandHandler = (path) => {
    return () => {
      const arrayIndexes = path.split("/").map(Number);
      const newExplorer = structuredClone(fileExplorerData);

      console.log("arrayIndexes", arrayIndexes)

      console.log("arrayIndexes.slice(0,arrayIndexes.at(-1))", arrayIndexes.slice(0,-1))

      const parentArray = arrayIndexes?.slice(0,-1)?.reduce((acc, next)=> {
        console.log("acc", acc)
        console.log("next index", next)
        console.log("reduce return", acc[next].children)
        return acc[next].children
      },newExplorer)

      console.log("parentArray", parentArray)

      const lastIndex = arrayIndexes.at(-1)

      const targetNode = parentArray[lastIndex]

      console.log("targetnode", targetNode);

      targetNode.isExpanded = !targetNode.isExpanded;

      setFileExplorerData(newExplorer);
    };
  };

  const handleAddFile = (path, type) => {
    return () => {
      const arrayIndexes = path.split("/").map(Number);
      const newExplorer = structuredClone(fileExplorerData);

      // Walk down to the parent array of the target node
      const parentArray = arrayIndexes.slice(0, -1).reduce((acc, next) => {
        return acc[next].children;
      }, newExplorer);

      const lastIndex = arrayIndexes.at(-1);
      const targetNode = parentArray[lastIndex];

      targetNode.isExpanded = true;

      console.log("addin new add file to ", targetNode);

      targetNode.children = [
        {
          id: new Date().getTime(),
          type: type,
        },
        ...targetNode.children,
      ];

      setFileExplorerData(newExplorer);
    };
  };

  const handleKeyDown = (path, type) => {
    return (e) => {
      if (e.key === "Enter") {
        const fileName = e.target.value;

        const arrayIndexes = path.split("/").map(Number);
        const newExplorer = structuredClone(fileExplorerData);

        // Walk down to the parent array of the target node
        const parentArray = arrayIndexes.slice(0, -1).reduce((acc, next) => {
          return acc[next].children;
        }, newExplorer);

        const newFile =
          type === "file"
            ? {
                id: new Date().getTime(),
                type: "file",
                name: fileName,
              }
            : {
                id: new Date().getTime(),
                type: "folder",
                name: fileName,
                children: [],
              };

        parentArray[0] = newFile;

        setFileExplorerData(newExplorer);
      }
    };
  };

  const handleDelete = (path) => {
    return () => {
        const arrayIndexes = path.split("/").map(Number)
        console.log(arrayIndexes)
        const newExplorer = structuredClone(fileExplorerData)

        const parentArray = arrayIndexes.slice(0, -1).reduce((acc, next)=> {
            return acc[next].children;
        }, newExplorer)

        const lastIndex = arrayIndexes.at(-1);

        console.log("deleted click for parent", parentArray);
        console.log("last index at", lastIndex)

        parentArray.splice(lastIndex, 1)
        
        setFileExplorerData(newExplorer)
    }
  }

  return (
    <div>
      <Tree
        data={fileExplorerData}
        handleExpand={expandHandler}
        handleAddFile={handleAddFile}
        handleAddFolder={handleAddFile}
        handleKeyDown={handleKeyDown}
        handleDelete={handleDelete}
      />
    </div>
  );
};
