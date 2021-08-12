import funcUpdateTodo from "./funcUpdateTodo.js";
import funcGetFullTextTodo from "./funcGetFullTextTodo.js";
import { SERVER_URL } from "./../../../../constants.js";

let itemId = "",
    finalPriority = "";
export function drag(event, id) {
    itemId = id;
    event.dataTransfer.setData("text/uri-list", event.target.id);
}

export function allowDrop(event) {
    event.preventDefault();
}

export function drop(event, priority, searchText, dispatch) {
    event.preventDefault();

    finalPriority = priority;
    const updateUrl = `${SERVER_URL}?action=UPDATE_TODO`;

    funcUpdateTodo(updateUrl, itemId, "priority", finalPriority, dispatch);

    const fullTextTodoUrl = `${SERVER_URL}?action=GET_FULLTEXT_TODO`;

    funcGetFullTextTodo(fullTextTodoUrl, searchText, dispatch);
}
