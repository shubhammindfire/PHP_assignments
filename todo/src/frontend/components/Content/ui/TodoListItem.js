import React, { useState } from "react";
import useDeleteTodo from "./../utils/useDeleteTodo.js";
import useUpdateTodo from "../utils/useUpdateTodo.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../../../redux/todo/todoActions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { getAllTodo } from "../../../../redux/todo/todoActions.js";

function TodoListItem(props) {
    const [showModal, setShowModal] = useState(false);
    const [changeTitle, setChangeTitle] = useState(props.listItem.title);
    const [changePriority, setChangePriority] = useState(
        props.listItem.priority
    );
    const dispatch = useDispatch();
    const listItem = props.listItem;
    console.log(`props = ${JSON.stringify(props.listItem)}`);
    const url = `http://localhost/PHP_assignments/todo/src/backend/utils/updateTodo.php`;

    function handleChangePriority(e, priority) {
        e.preventDefault();
        setChangePriority(priority);
    }

    function handleTitleChange(e) {
        e.preventDefault();
        setChangeTitle(e.target.value);
    }

    function handleCloseModal(e) {
        e.preventDefault();
        setShowModal(false);
    }
    const useHandleDelete = () => {
        useDeleteTodo(url, listItem.id);
        dispatch(deleteTodo(listItem.id));
    };

    const useHandleUpdate = (e) => {
        e.preventDefault();
        console.log("update");
        setShowModal(true);
        // alert("Update Todo?");
        // useUpdateTodo(url, listItem.id);
        // dispatch(deleteTodo(listItem.id));
    };

    function useHandleSubmitModal(e) {
        e.preventDefault();

        useUpdateTodo(url, listItem.id, "title", changeTitle);
        useUpdateTodo(url, listItem.id, "priority", changePriority);

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
        setShowModal(false);
    }

    return (
        <div
            className={`flex p-2 m-2 ${
                listItem.priority === "LOW"
                    ? "bg-yellow-50"
                    : listItem.priority === "MEDIUM"
                    ? "bg-yellow-200"
                    : "bg-red-100"
            }`}
        >
            <input type="checkbox" />
            <p className="flex-1 w-80 break-words px-2">{listItem.title}</p>
            <button
                className="text-green-600"
                title="Update"
                onClick={useHandleUpdate}
            >
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
                className="text-red-600 ml-2"
                title="Delete"
                onClick={useHandleDelete}
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {/* Modal */}
            {showModal ? (
                // <div class="w-80 h-80 fixed pin z-50 overflow-auto bg-red flex">
                <div className="w-96 h-40 fixed bg-white border border-black rounded-lg">
                    {/* dialog */}
                    <div className="relative p-8 w-full max-w-md m-auto flex-col flex">
                        <button
                            className="absolute right-0 top-0 mr-2 mt-2"
                            onClick={handleCloseModal}
                            title="Close"
                        >
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                        <form onSubmit={useHandleSubmitModal}>
                            <input
                                type="text"
                                placeholder="Enter todo"
                                size="25"
                                value={changeTitle}
                                onChange={handleTitleChange}
                                className="block m-auto px-2 border-gray-400 focus:border-black border-2 leading-10 rounded-md"
                            />
                            <div>
                                <button
                                    type="button"
                                    className={`block float-left p-1 mt-5 text-sm bg-yellow-200 hover:bg-yellow-300 text-white rounded-md ${
                                        changePriority === "LOW"
                                            ? "border-black border"
                                            : ""
                                    }`}
                                    onClick={(e) =>
                                        handleChangePriority(e, "LOW")
                                    }
                                >
                                    LOW
                                </button>
                                <button
                                    type="button"
                                    className={`block float-left p-1 mt-5 mx-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md ${
                                        changePriority === "MEDIUM"
                                            ? "border-black border"
                                            : ""
                                    }`}
                                    onClick={(e) =>
                                        handleChangePriority(e, "MEDIUM")
                                    }
                                >
                                    MEDIUM
                                </button>
                                <button
                                    type="button"
                                    className={`block float-left p-1 mt-5 ml-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md ${
                                        changePriority === "HIGH"
                                            ? "border-black border"
                                            : ""
                                    }`}
                                    onClick={(e) =>
                                        handleChangePriority(e, "HIGH")
                                    }
                                >
                                    HIGH
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="block float-right p-2 mt-4 mx-2 bg-blue-600 text-white rounded-md"
                            >
                                Update Todo
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default TodoListItem;
