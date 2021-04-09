import React, { useState } from "react";
import { useDispatch } from "react-redux";
import funcAddTodo from "../utils/funcAddTodo.js";

function Card() {
    const [todoText, setTodoText] = useState("");
    const [priority, setPriority] = useState("LOW");
    const dispatch = useDispatch();

    const addTodoUrl =
        "http://localhost/PHP_assignments/todo/src/backend/utils/todo.php?action=ADD_TODO";

    function changePriority(e, priority) {
        e.preventDefault();
        setPriority(priority);
    }

    function useOnHandleChange(event) {
        setTodoText(event.target.value);
    }

    function useHandleClick(e) {
        e.preventDefault();

        const isCompleted = 0;
        const newTodo = {
            title: todoText,
            isCompleted: isCompleted,
            priority: priority,
        };
        funcAddTodo(addTodoUrl, newTodo, dispatch);

        setTodoText("");
    }

    return (
        <div className="rounded w-80 m-4 bg-gray-50 shadow-lg p-6 align-middle">
            <form onSubmit={useHandleClick}>
                {/* TODO manage it overflow in Chrome browser */}
                <input
                    type="text"
                    placeholder="Enter todo"
                    size="25"
                    maxLength="500"
                    value={todoText}
                    onChange={useOnHandleChange}
                    className="block m-auto px-2 border-gray-400 focus:border-black border-2 leading-10 rounded-md"
                />
                <div>
                    <button
                        type="button"
                        className={`priorityBtn bg-yellow-200 hover:bg-yellow-300 text-white rounded-md ${
                            priority === "LOW" ? "border-black border" : ""
                        }`}
                        onClick={(e) => changePriority(e, "LOW")}
                    >
                        LOW
                    </button>
                    <button
                        type="button"
                        className={`priorityBtn mx-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md ${
                            priority === "MEDIUM" ? "border-black border" : ""
                        }`}
                        onClick={(e) => changePriority(e, "MEDIUM")}
                    >
                        MEDIUM
                    </button>
                    <button
                        type="button"
                        className={`priorityBtn ml-1 bg-red-500 hover:bg-red-600 text-white rounded-md ${
                            priority === "HIGH" ? "border-black border" : ""
                        }`}
                        onClick={(e) => changePriority(e, "HIGH")}
                    >
                        HIGH
                    </button>
                </div>
                <button
                    type="submit"
                    className="block float-right p-2 mt-4 mx-2 bg-green-600 text-white rounded-md"
                >
                    Add Todo
                </button>
            </form>
        </div>
    );
}

export default Card;
