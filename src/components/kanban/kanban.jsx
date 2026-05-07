import { useState } from "react";
import "./kanban.css";

export const Kanban = () => {
  const [board, setBoard] = useState({
    todo: Array.from({ length: 5 }, (_, i) => `Todo ${i + 1}`),
    inprogress: Array.from({ length: 3 }, (_, i) => `Progress ${i + 1}`),
    done: Array.from({ length: 2 }, (_, i) => `Done ${i + 1}`)
  });

  const [dragItem, setDragItem] = useState({
    sourceCol: null,
    sourceIndex: -1
  });

  const [hoverItem, setHoverItem] = useState({
    targetCol: null,
    targetIndex: -1
  });

  const reset = () => {
    setDragItem({ sourceCol: null, sourceIndex: -1 });
    setHoverItem({ targetCol: null, targetIndex: -1 });
  };

  // 🔥 Core Logic (extends your splice logic)
  const moveItem = (sourceCol, sourceIndex, targetCol, targetIndex) => {
    if (sourceIndex === -1 || targetIndex === -1) return;

    const newBoard = { ...board };

    const sourceList = [...newBoard[sourceCol]];
    const targetList =
      sourceCol === targetCol
        ? sourceList
        : [...newBoard[targetCol]];

    const [movedItem] = sourceList.splice(sourceIndex, 1);

    targetList.splice(targetIndex, 0, movedItem);

    newBoard[sourceCol] = sourceList;
    newBoard[targetCol] = targetList;

    return newBoard;
  };

  const handleDrop = () => {
    const { sourceCol, sourceIndex } = dragItem;
    const { targetCol, targetIndex } = hoverItem;

    const updated = moveItem(
      sourceCol,
      sourceIndex,
      targetCol,
      targetIndex
    );

    if (updated) setBoard(updated);
    reset();
  };

  console.log(dragItem, hoverItem)

  const columns = ["todo", "inprogress", "done"];

  return (
    <div className="kanban-container">
      {columns.map((col) => (
        <div key={col} className="kanban-column">
          <h3>{col.toUpperCase()}</h3>

          {board[col].map((item, index) => {
            let cls = "card";

            if (
              dragItem.sourceCol === col &&
              dragItem.sourceIndex === index
            ) {
              cls += " grabbing";
            }

            if (
              hoverItem.targetCol === col &&
              hoverItem.targetIndex === index
            ) {
              cls += " hover";
            }

            return (
              <div
                key={index}
                draggable
                className={cls}
                onDragStart={() =>
                  setDragItem({
                    sourceCol: col,
                    sourceIndex: index
                  })
                }
                onDragEnd={reset}
                onDragOver={(e) => {
                  e.preventDefault();
                  setHoverItem({
                    targetCol: col,
                    targetIndex: index
                  });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop();
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};