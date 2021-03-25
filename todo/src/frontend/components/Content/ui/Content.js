import React from "react";
import Card from "./Card.js";
import TodoList from "./TodoList.js";

function Content() {
    return (
        <div className="flex justify-center items-center">
            <Card />
            <TodoList />
        </div>
    );
}

export default Content;
