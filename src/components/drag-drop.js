// src/components/DragDropExample.js

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Initial list of items
const initialItems = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
  { id: "4", content: "Item 4" },
];

const DragDropExample = () => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    console.log("dragEnd");
    // Check if the item was dropped outside the list
    if (!result.destination) return;

    // Reorder the items based on the drag result
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    // Update the state with the new order
    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul
            className="list"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ padding: 0 }} // Reset padding for the list
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="list-item"
                    style={{
                      ...provided.draggableProps.style,
                      padding: "10px",
                      marginBottom: "8px",
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder} {/* This component is necessary */}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropExample;
