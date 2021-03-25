import React from "react";

function TodoListItem(props) {
    const [listItem] = props;
    console.log(`list item = ${JSON.stringify(listItem)}`);
    return (
        <div>
            <p>id = {listItem.id}</p>
            <p>title = {listItem.title}</p>
            <p>priority = {listItem.priority}</p>
            <p>isCompleted = {listItem.isCompleted}</p>
            <p>dateAdded = {listItem.dateAdded}</p>
        </div>
    );
}

export default TodoListItem;
