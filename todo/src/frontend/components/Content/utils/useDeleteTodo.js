import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../../../redux/todo/todoActions.js";

// custom hook to delete a todo
function useDeleteTodo(url, id) {
    // const dispatch = useDispatch();

    const headers = {
        "Content-Type": "application/json",
    };
    const data = {
        id: id,
    };

    axios
        .delete(url, { headers, data })
        .then((response) => {
            // TODO not able to call dispatch hook as it breaks 'rules of hook'
            // dispatch(deleteTodo(id));
        })
        .catch((error) => {
            console.error(`Axios Error: ${error}`);
        });
}
export default useDeleteTodo;
