import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// custom hook to delete a todo
function useAddTodo(url, newTodo) {
    // const dispatch = useDispatch();
    // useEffect(() => {}, []);

    const headers = {
        "Content-Type": "application/json",
    };
    const data = {
        title: newTodo.title,
        isCompleted: newTodo.isCompleted,
        priority: newTodo.priority,
    };

    axios
        .post(url, {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
            priority: newTodo.priority,
        })
        .then((response) => {
            console.log(`DONE response: ${JSON.stringify(response)}`);
            // console.log(`DONE response: ${JSON.stringify(response.data)}`);
            // console.log("SUCCESS");
            // TODO not able to call dispatch hook as it breaks 'rules of hook'
            // dispatch addTodo;
        })
        .catch((error) => {
            console.error(`Axios Error: ${error}`);
        });
}
export default useAddTodo;
