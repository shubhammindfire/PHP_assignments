import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoListItem from "./TodoListItem.js";
import funcGetAllTodo from "../utils/funcGetAllTodo.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
    getFullTextTodo,
    changeSearchText,
} from "../../../../redux/todo/todoActions.js";

function TodoList() {
    const dispatch = useDispatch();
    const [isCompletedFilter, changeIsCompletedFilter] = useState(false);
    // const [searchText, changeSearchText] = useState("");
    const searchText = useSelector((state) => state.searchText);
    const allTodoUrl =
        "http://localhost/PHP_assignments/todo/src/backend/utils/todo.php?action=GET_ALL_TODO";
    const fullTextTodoUrl =
        "http://localhost/PHP_assignments/todo/src/backend/utils/todo.php?action=GET_FULLTEXT_TODO";
    const { allTodoData } = funcGetAllTodo(
        allTodoUrl,
        dispatch,
        useSelector,
        useEffect
    );
    const fullTextTodoData = Array.from(
        useSelector((state) => state.fullTextTodoData)
    );

    let notCompletedTodo, completedTodo, fullTextCompleted;

    completedTodo = allTodoData.filter(
        (element) => element.isCompleted === "1"
    );
    notCompletedTodo = allTodoData.filter(
        (element) => element.isCompleted === "0"
    );
    fullTextCompleted = fullTextTodoData.filter(
        (element) => element.isCompleted === "1"
    );

    function handleCompletedFilter(e) {
        e.preventDefault();
        changeIsCompletedFilter(!isCompletedFilter);
    }

    function useHandleSearchText(e) {
        // changeSearchText(e.target.value);
        dispatch(changeSearchText(e.target.value));

        axios
            .post(fullTextTodoUrl, {
                searchText: e.target.value,
            })
            .then((response) => {
                dispatch(getFullTextTodo(response.data.payload));
            })
            .catch((error) => {
                console.error(`Axios Error: ${error}`);
            });
    }

    return (
        <div>
            <div id="filters">
                Filters
                <FontAwesomeIcon
                    className="text-blue-600 mx-2"
                    icon={faFilter}
                />
                <button
                    onClick={handleCompletedFilter}
                    className={`bg-blue-300 hover:bg-blue-700 text-white px-2 rounded ${
                        isCompletedFilter
                            ? "border-black border bg-blue-500"
                            : ""
                    }`}
                >
                    Is Completed
                </button>
                <input
                    type="text"
                    placeholder="Enter todo"
                    size="25"
                    maxLength="500"
                    value={searchText}
                    onChange={useHandleSearchText}
                    className="inline-block ml-2 px-2 border-gray-400 focus:border-black border-2 leading-10 rounded-md"
                />
            </div>
            {/* Check if only isCompletedFilter is applied */}
            {isCompletedFilter && (searchText === "" || searchText === null) ? (
                <div id="isCompletedFilter">
                    {completedTodo.map((element) => {
                        return (
                            <TodoListItem key={element.id} listItem={element} />
                        );
                    })}
                    {completedTodo.length === 0 ? (
                        <p>No Todo Completed</p>
                    ) : null}
                </div>
            ) : null}
            {/* Check if only fullTextFilter is applied */}
            {!isCompletedFilter && searchText !== "" && searchText !== null ? (
                <div id="fullTextFilter">
                    {fullTextTodoData.map((element) => {
                        return (
                            <TodoListItem key={element.id} listItem={element} />
                        );
                    })}
                    {fullTextTodoData.length === 0 ? (
                        <p>No Todo for '{searchText}'</p>
                    ) : null}
                </div>
            ) : null}
            {/* Check if both isCompletedFilter and fulltextFilter is applied */}
            {isCompletedFilter && searchText !== "" && searchText !== null ? (
                <div id="bothFilter">
                    {fullTextCompleted.map((element) => {
                        return (
                            <TodoListItem key={element.id} listItem={element} />
                        );
                    })}
                    {fullTextCompleted.length === 0 ? (
                        <p>No Todo Completed</p>
                    ) : null}
                </div>
            ) : null}
            {/* Show this only if no filters are applied */}
            {!isCompletedFilter &&
            (searchText === "" || searchText === null) ? (
                <div id="allTodo">
                    {notCompletedTodo.map((element) => {
                        return (
                            <TodoListItem key={element.id} listItem={element} />
                        );
                    })}
                    {completedTodo.map((element) => {
                        return (
                            <TodoListItem key={element.id} listItem={element} />
                        );
                    })}
                    {completedTodo.length === 0 &&
                    notCompletedTodo.length === 0 ? (
                        <p>No Todo Added</p>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

export default TodoList;
