import { createStore, applyMiddleware } from "redux";
import todoReducer from "./todo/todoReducer.js";
import logger from "redux-logger";

const store = createStore(todoReducer, applyMiddleware(logger));

export default store;
