import { GET_ALL_TODO } from "./todoTypes.js";

export const getAllTodo = (allTodoData = []) => {
    return {
        type: GET_ALL_TODO,
        payload: allTodoData,
    };
};
