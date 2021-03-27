import { GET_ALL_TODO } from "./todoTypes.js";

const initialState = {
    allTodoData: [],
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TODO:
            return { allTodoData: action.payload };
        default:
            return state;
    }
};

export default todoReducer;
