import { GET_ALL_TODO, DELETE_TODO } from "./todoTypes.js";

export const getAllTodo = (allTodoData = []) => {
    return {
        type: GET_ALL_TODO,
        payload: allTodoData,
    };
};

export const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        payload: id,
    };
};
