export const Tree = ({
  data,
  handleExpand,
  path = "",
  handleAddFile,
  handleAddFolder,
  handleKeyDown,
  handleDelete
}) => {
  return (
    <div>
      {data.map((node, index) => {
        const localPath = path === "" ? String(index) : `${path}/${index}`;
        return (
          <div key={index} style={{ marginLeft: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{ padding: "8px", cursor: "pointer" }}
                onClick={handleExpand(localPath)}
              >
                {node.type !== "add-file" &&
                  node.type !== "add-folder" &&
                  (node.type === "file" ? (
                    <span>📄 {node.name}</span>
                  ) : (
                    <span>
                      {node.isExpanded ? "📂" : "📁"} {node.name}
                    </span>
                  ))}
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                {node.type === "folder" && (
                  <div style={{display: "flex", alignItems: "center", gap: "4px"}}>
                    <button onClick={handleAddFolder(localPath, "add-folder")}>
                      💗
                    </button>
                    <button onClick={handleAddFile(localPath, "add-file")}>
                      ❤️
                    </button>
                  </div>
                )}
                 {(node.type === "folder" || node.type === "file") && (<button onClick={handleDelete(localPath)}>🗑️</button>)}
              </div>
            </div>
            {node.type === "add-file" && (
              <input
                type="text"
                onKeyDown={handleKeyDown(localPath, "file")}
                autoFocus
              />
            )}
            {node.type === "add-folder" && (
              <input
                type="text"
                onKeyDown={handleKeyDown(localPath, "folder")}
                autoFocus
              />
            )}
            {node.isExpanded && node.type === "folder" && (
              <Tree
                data={node.children}
                handleExpand={handleExpand}
                path={localPath}
                handleAddFile={handleAddFile}
                handleAddFolder={handleAddFolder}
                handleKeyDown={handleKeyDown}
                handleDelete={handleDelete}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
