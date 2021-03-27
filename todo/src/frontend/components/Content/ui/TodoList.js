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
                      console.log(`element = ${JSON.stringify(element)}`);
                      return <TodoListItem listItem={element} />;
                  })
                : "null"}
        </div>
    );
}

export default TodoList;
