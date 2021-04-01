import React from "react";
import useDeleteTodo from "./../utils/useDeleteTodo";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../../../redux/todo/todoActions.js";

function TodoListItem(props) {
    const dispatch = useDispatch();
    const listItem = props.listItem;
    console.log(`props = ${JSON.stringify(props.listItem)}`);
    const url = `http://localhost/PHP_assignments/todo/src/backend/utils/deleteTodo.php`;

    const useHandleDelete = () => {
        console.log("use handle delete");

        useDeleteTodo(url, listItem.id);
        dispatch(deleteTodo(listItem.id));
    };

    return (
        <div className={`flex p-2 m-2 ${listItem.priority === "LOW"?"bg-yellow-50":(listItem.priority === "MEDIUM"?"bg-yellow-200":"bg-red-100")}`}>
            <input type="checkbox" />
            <p className="flex-1 w-80 break-words px-2">{listItem.title}</p>
            <button className="text-red-600" onClick={useHandleDelete}>
                Delete
            </button>
        </div>
    );
}

export default TodoListItem;
