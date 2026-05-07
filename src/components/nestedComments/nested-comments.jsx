import { useState } from "react";
import { Reply } from "./reply";

const actualComments = [];

export const NestedComment = () => {
    const [commentsData, setCommentsData] = useState(actualComments);
    const [commentInput, setCommentInput] = useState("");

    const commentInputHandler = (e) => {
        setCommentInput(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        if (e.key === "Enter") {
            e.stopPropagation();
            if (!commentInput.trim()) return;
            setCommentsData((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    comment: commentInput,
                    children: [],
                },
            ]);
            setCommentInput("");
        }
    };

    function getNodeById(tree, targetId) {
        for (const node of tree) {
            if (node.id === targetId) return node;
            if (node.children?.length > 0) {
                const found = getNodeById(node.children, targetId);
                if (found) return found;
            }
        }
        return null;
    }

    function deleteNodeById(tree, targetId) {
        return tree
            .filter((node) => node.id !== targetId)
            .map((node) => ({
                ...node,
                children: node.children ? deleteNodeById(node.children, targetId) : [],
            }));
    }

    const expandHandler = (id) => () => {
        const newCommentsData = structuredClone(commentsData);
        const item = getNodeById(newCommentsData, id);
        if (!item) return;
        item.isExpanded = !item.isExpanded;
        setCommentsData(newCommentsData);
    };

    const handlereplyMode = (id) => (e) => {
        e.stopPropagation();
        const newCommentsData = structuredClone(commentsData);
        const item = getNodeById(newCommentsData, id);
        if (!item) return;
        item.isReplyMode = !item.isReplyMode;
        // close edit mode if reply is opened
        if (item.isReplyMode) item.isEditMode = false;
        setCommentsData(newCommentsData);
    };

    const handlereplySubmission = (id, reply) => (e) => {
        if (e.key === "Enter") {
            if (!reply.trim()) return;
            const newCommentsData = structuredClone(commentsData);
            const item = getNodeById(newCommentsData, id);
            if (!item) return;
            item.isReplyMode = false;
            item.isExpanded = true;
            item.children.push({
                id: crypto.randomUUID(),
                comment: reply,
                children: [],
            });
            setCommentsData(newCommentsData);
        }
    };

    const handleEditMode = (id) => (e) => {
        e.stopPropagation();
        const newCommentsData = structuredClone(commentsData);
        const item = getNodeById(newCommentsData, id);
        if (!item) return;
        item.isEditMode = !item.isEditMode;
        // close reply mode if edit is opened
        if (item.isEditMode) item.isReplyMode = false;
        setCommentsData(newCommentsData);
    };

    const handleEditSubmission = (id, editedText) => (e) => {
        if (e.key === "Enter") {
            if (!editedText.trim()) return;
            const newCommentsData = structuredClone(commentsData);
            const item = getNodeById(newCommentsData, id);
            if (!item) return;
            item.comment = editedText;
            item.isEditMode = false;
            setCommentsData(newCommentsData);
        }
    };

    const handleDelete = (id) => () => {
        setCommentsData((prev) => deleteNodeById(prev, id));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>
                <div style={{ padding: "8px 0" }}>Comment Here</div>
                <input
                    type="text"
                    style={{
                        width: "400px",
                        height: "50px",
                        padding: "8px",
                        fontSize: "18px",
                    }}
                    onChange={commentInputHandler}
                    onKeyDown={handleCommentSubmit}
                    value={commentInput}
                />
            </div>
            <div>
                <Reply
                    data={commentsData}
                    handleExpand={expandHandler}
                    handlereplyMode={handlereplyMode}
                    handlereplySubmission={handlereplySubmission}
                    handleEditMode={handleEditMode}
                    handleEditSubmission={handleEditSubmission}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
};