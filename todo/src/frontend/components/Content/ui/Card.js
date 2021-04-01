import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useAddTodo from "./../utils/useAddTodo.js";
import axios from "axios";
import { getAllTodo } from "../../../../redux/todo/todoActions.js";

function Card() {
    const [todoText, setTodoText] = useState("");
    const [priority, setPriority] = useState("LOW");
    const dispatch = useDispatch();

    const url =
        "http://localhost/PHP_assignments/todo/src/backend/utils/addTodo.php";

    function changePriority(e, priority) {
        e.preventDefault();
        setPriority(priority);
    }

    function useOnHandleChange(event) {
        setTodoText(event.target.value);
    }
    function useHandleClick(e) {
        e.preventDefault();
        console.log("The link was clicked.");
        const isCompleted = 0;
        const newTodo = {
            title: todoText,
            isCompleted: isCompleted,
            priority: priority,
        };
        useAddTodo(url, newTodo);
        // used a little hack as I cannot dispatch in useAddTodo!!
        // so I wait for the axios in useAddTodo to complete thus the wait for 0.5 sec
        setTimeout(function () {
            axios
                .get(
                    "http://localhost/PHP_assignments/todo/src/backend/utils/getAllTodo.php"
                )
                .then((response) => {
                    dispatch(getAllTodo(response.data));
                })
                .catch((error) => console.error(`Error: ${error}`));
        }, 500);

        setTodoText("");
    }
    return (
        <div className="rounded w-80 m-4 bg-gray-50 shadow-lg p-6 align-middle">
            <form onSubmit={useHandleClick}>
                <input
                    type="text"
                    placeholder="Enter todo"
                    size="25"
                    value={todoText}
                    onChange={useOnHandleChange}
                    className="block m-auto px-2 border-gray-400 focus:border-black border-2 leading-10 rounded-md"
                />
                <div>
                    <button
                        type="button"
                        className={`block float-left p-1 mt-5 text-sm bg-yellow-200 hover:bg-yellow-300 text-white rounded-md ${
                            priority === "LOW" ? "border-black border" : ""
                        }`}
                        onClick={(e) => changePriority(e, "LOW")}
                    >
                        LOW
                    </button>
                    <button
                        type="button"
                        className={`block float-left p-1 mt-5 mx-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md ${
                            priority === "MEDIUM" ? "border-black border" : ""
                        }`}
                        onClick={(e) => changePriority(e, "MEDIUM")}
                    >
                        MEDIUM
                    </button>
                    <button
                        type="button"
                        className={`block float-left p-1 mt-5 ml-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md ${
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
