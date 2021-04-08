import axios from "axios";
import { getAllTodo } from "../../../../redux/todo/todoActions.js";

// function to load all todo data
function funcGetAllTodo(url, dispatch, selector, effect) {
    const allTodoData = Array.from(selector((state) => state.allTodoData));

    effect(() => {
        axios
            .get(url)
            .then((response) => {
                if (response.data.status.code === "200") {
                    dispatch(getAllTodo(response.data.payload));
                } else {
                    console.log(
                        `Error : ERROR CODE=${response.data.status.code} ERROR MESSAGE=${response.data.status.message}`
                    );
                }
            })
            .catch((error) => console.error(`Error: ${error}`));
    }, [dispatch, url]);

    return { allTodoData };
}
export default funcGetAllTodo;
