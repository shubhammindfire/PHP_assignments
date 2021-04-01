import React from "react";
import TodoListItem from "./TodoListItem.js";
import useGetAllTodo from "../utils/useGetAllTodo.js";

function TodoList() {
    const url =
        "http://localhost/PHP_assignments/todo/src/backend/utils/getAllTodo.php";
    const { allTodoData } = useGetAllTodo(url);

    let notCompletedTodo, completedTodo;

    completedTodo = allTodoData.filter(
        (element) => element.isCompleted === "1"
    );
    notCompletedTodo = allTodoData.filter(
        (element) => element.isCompleted === "0"
    );

    return (
        <div>
            {notCompletedTodo.map((element) => {
                return <TodoListItem key={element.id} listItem={element} />;
            })}
            {completedTodo.map((element) => {
                return <TodoListItem key={element.id} listItem={element} />;
            })}
            {completedTodo.length === 0 && notCompletedTodo.length === 0 ? (
                <p>No Todo Added</p>
            ) : null}
        </div>
    );
}

export default TodoList;
