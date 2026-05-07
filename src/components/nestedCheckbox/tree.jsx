export const Tree = ({ data, path = "", handleExpand, handleChecked }) => {
    console.log(data, "tree")
    return (
        <div>
            {data?.map((item, index) => {
                const localpath = path === "" ? String(index) : `${path}/${index}`

                return (
                    <div style={{ paddingLeft: "14px" }} key={item.name}>
                        <span style={{ display: "flex" }}>
                            <input type="checkbox" checked={item.type==="state" ? item.children.every((child) => child.isChecked === true) :  item?.isChecked} onChange={handleChecked(localpath)}/>
                            <button style={{ background: "transparent", border: "none" }} onClick={handleExpand(localpath)}>
                                {item.name}
                            </button>

                        </span>
                        {item.type === "state" && item?.
                            isExpanded
                            && <Tree data={item.children} path={localpath} handleExpand={handleExpand} handleChecked={handleChecked} />}
                    </div>
                )
            })}
        </div>
    )
}