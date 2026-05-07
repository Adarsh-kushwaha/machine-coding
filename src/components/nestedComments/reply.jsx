import { useState } from "react";

const CommentItem = ({
    item,
    handleExpand,
    handlereplyMode,
    handlereplySubmission,
    handleEditMode,
    handleEditSubmission,
    handleDelete,
}) => {
    const [replyInput, setReplyInput] = useState("");
    const [editInput, setEditInput] = useState(item.comment);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {item.isEditMode ? (
                    <input
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        onKeyDown={handleEditSubmission(item.id, editInput)}
                        autoFocus
                    />
                ) : (
                    <div onClick={handleExpand(item.id)} style={{ cursor: "pointer" }}>
                        {item.comment}
                    </div>
                )}
                <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={handlereplyMode(item.id)}>
                        {item?.isReplyMode ? "cancel" : "reply"}
                    </button>
                    <button onClick={handleDelete(item.id)}>Delete</button>
                    <button onClick={handleEditMode(item.id)}>
                        {item?.isEditMode ? "cancel" : "edit"}
                    </button>
                </div>
            </div>

            {item?.isReplyMode && (
                <input
                    type="text"
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    onKeyDown={(e) => {
                        handlereplySubmission(item.id, replyInput)(e);
                        if (e.key === "Enter") setReplyInput("");
                    }}
                    autoFocus
                />
            )}

            {item.children && item.isExpanded && (
                <Reply
                    data={item.children}
                    handleExpand={handleExpand}
                    handlereplyMode={handlereplyMode}
                    handlereplySubmission={handlereplySubmission}
                    handleEditMode={handleEditMode}
                    handleEditSubmission={handleEditSubmission}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export const Reply = ({
    data,
    handleExpand,
    handlereplyMode,
    handlereplySubmission,
    handleEditMode,
    handleEditSubmission,
    handleDelete,
}) => {
    return (
        <div
            style={{
                paddingLeft: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
            }}
        >
            {data.map((item) => (
                <CommentItem
                    key={item.id}
                    item={item}
                    handleExpand={handleExpand}
                    handlereplyMode={handlereplyMode}
                    handlereplySubmission={handlereplySubmission}
                    handleEditMode={handleEditMode}
                    handleEditSubmission={handleEditSubmission}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
};