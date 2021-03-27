import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getAllTodo } from "../../../../redux/todo/todoActions.js";

// custom hook to load all todo data
function useGetAllTodo(url) {
    const allTodoData = Array.from(useSelector((state) => state.allTodoData));
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                dispatch(getAllTodo(response.data));
            })
            .catch((error) => console.error(`Error: ${error}`));
    }, [dispatch, url]);

    return { allTodoData };
}
export default useGetAllTodo;
