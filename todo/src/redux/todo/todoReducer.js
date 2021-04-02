import {
    GET_ALL_TODO,
    DELETE_TODO,
    ADD_TODO,
    GET_FULLTEXT_TODO,
} from "./todoTypes.js";

const initialState = {
    allTodoData: [],
    fullTextTodoData: [],
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TODO:
            return { ...state, allTodoData: action.payload };
        case DELETE_TODO:
            return {
                ...state,
                allTodoData: [
                    ...state.allTodoData.filter(
                        (todo) => todo.id !== action.payload
                    ),
                ],
            };
        case ADD_TODO:
            return {
                ...state,
                allTodoData: [...state.allTodoData, action.payload],
            };
        case GET_FULLTEXT_TODO:
            return { ...state, fullTextTodoData: action.payload };
        default:
            return state;
    }
};

export default todoReducer;
