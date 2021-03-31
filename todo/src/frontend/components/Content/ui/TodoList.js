import React from "react";
import TodoListItem from "./TodoListItem.js";
import useGetAllTodo from "../utils/useGetAllTodo.js";

function TodoList() {
    const url =
        "http://localhost/PHP_assignments/todo/src/backend/utils/getAllTodo.php";
    const { allTodoData } = useGetAllTodo(url);

    return (
        <div>
            {allTodoData
                ? allTodoData.map((element) => {
                      return <TodoListItem key={element.id} listItem={element} />;
                  })
                : "null"}
        </div>
    );
}

export default TodoList;
