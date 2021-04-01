import React from "react";
import TodoListItem from "./TodoListItem.js";
import useGetAllTodo from "../utils/useGetAllTodo.js";

function TodoList() {
    const url =
        "http://localhost/PHP_assignments/todo/src/backend/utils/getAllTodo.php";
    const { allTodoData } = useGetAllTodo(url);

    return (
        <div>
            {allTodoData.length !== 0 ? (
                allTodoData.map((element) => {
                    return <TodoListItem key={element.id} listItem={element} />;
                })
            ) : (
                <p>No Todo Added</p>
            )}
        </div>
    );
}

export default TodoList;
