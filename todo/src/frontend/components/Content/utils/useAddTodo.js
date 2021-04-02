import axios from "axios";
import { useDispatch } from "react-redux";

// custom hook to delete a todo
function useAddTodo(url, newTodo) {
    // const dispatch = useDispatch();

    axios
        .post(url, {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
            priority: newTodo.priority,
        })
        .then((response) => {
            // TODO not able to call dispatch hook as it breaks 'rules of hook'
            // dispatch addTodo;
        })
        .catch((error) => {
            console.error(`Axios Error: ${error}`);
        });
}
export default useAddTodo;
