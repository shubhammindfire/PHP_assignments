import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import funcGetAllTodo from "../utils/funcGetAllTodo.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
    getFullTextTodo,
    changeSearchText,
} from "../../../../redux/todo/todoActions.js";
import DisplayTodoGroup from "./DisplayTodoGroup.js";
import { SERVER_URL } from './../../../../constants.js';

function TodoList() {
    const dispatch = useDispatch();
    const [isCompletedFilter, changeIsCompletedFilter] = useState(false);
    const searchText = useSelector((state) => state.searchText);
    const allTodoUrl =
        `${SERVER_URL}?action=GET_ALL_TODO`;
    const fullTextTodoUrl =
        `${SERVER_URL}?action=GET_FULLTEXT_TODO`;
    const { allTodoData } = funcGetAllTodo(
        allTodoUrl,
        dispatch,
        useSelector,
        useEffect
    );
    const fullTextTodoData = Array.from(
        useSelector((state) => state.fullTextTodoData)
    );

    let notCompletedLowTodo,
        completedLowTodo,
        fullTextLowCompleted,
        fullTextLowNotCompleted;
    let notCompletedMediumTodo,
        completedMediumTodo,
        fullTextMediumCompleted,
        fullTextMediumNotCompleted;
    let notCompletedHighTodo,
        completedHighTodo,
        fullTextHighCompleted,
        fullTextHighNotCompleted;

    completedLowTodo = allTodoData.filter(
        (element) => element.priority === "LOW" && element.isCompleted === "1"
    );
    notCompletedLowTodo = allTodoData.filter(
        (element) => element.priority === "LOW" && element.isCompleted === "0"
    );
    fullTextLowCompleted = fullTextTodoData.filter(
        (element) => element.priority === "LOW" && element.isCompleted === "1"
    );
    fullTextLowNotCompleted = fullTextTodoData.filter(
        (element) => element.priority === "LOW" && element.isCompleted === "0"
    );

    completedMediumTodo = allTodoData.filter(
        (element) =>
            element.priority === "MEDIUM" && element.isCompleted === "1"
    );
    notCompletedMediumTodo = allTodoData.filter(
        (element) =>
            element.priority === "MEDIUM" && element.isCompleted === "0"
    );
    fullTextMediumCompleted = fullTextTodoData.filter(
        (element) =>
            element.priority === "MEDIUM" && element.isCompleted === "1"
    );
    fullTextMediumNotCompleted = fullTextTodoData.filter(
        (element) =>
            element.priority === "MEDIUM" && element.isCompleted === "0"
    );

    completedHighTodo = allTodoData.filter(
        (element) => element.priority === "HIGH" && element.isCompleted === "1"
    );
    notCompletedHighTodo = allTodoData.filter(
        (element) => element.priority === "HIGH" && element.isCompleted === "0"
    );
    fullTextHighCompleted = fullTextTodoData.filter(
        (element) => element.priority === "HIGH" && element.isCompleted === "1"
    );
    fullTextHighNotCompleted = fullTextTodoData.filter(
        (element) => element.priority === "HIGH" && element.isCompleted === "0"
    );

    function handleCompletedFilter(e) {
        e.preventDefault();
        changeIsCompletedFilter(!isCompletedFilter);
    }

    function useHandleSearchText(e) {
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
        <div className="flex flex-col">
            <div id="filters" className="m-auto p-2">
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
                    placeholder="Search todo"
                    maxLength="500"
                    value={searchText}
                    onChange={useHandleSearchText}
                    className="inline-block ml-2 px-2 border-gray-400 focus:border-black border-2 leading-10 rounded-md"
                />
            </div>
            {/* Check if only isCompletedFilter is applied */}
            {isCompletedFilter && (searchText === "" || searchText === null) ? (
                <div id="isCompletedFilter">
                    <div id="todoTable" className="flex">
                        <DisplayTodoGroup
                            id="lowTodo"
                            notCompletedTodo={null}
                            completedTodo={completedLowTodo}
                            priority="LOW"
                            dispatch={dispatch}
                        />
                        <DisplayTodoGroup
                            id="mediumTodo"
                            notCompletedTodo={null}
                            completedTodo={completedMediumTodo}
                            priority="MEDIUM"
                            dispatch={dispatch}
                        />
                        <DisplayTodoGroup
                            id="highTodo"
                            notCompletedTodo={null}
                            completedTodo={completedHighTodo}
                            priority="HIGH"
                            dispatch={dispatch}
                        />
                    </div>
                </div>
            ) : null}
            {/* Check if only fullTextFilter is applied */}
            {!isCompletedFilter && searchText !== "" && searchText !== null ? (
                <div id="fullTextFilter">
                    <div id="todoTable" className="flex">
                        <DisplayTodoGroup
                            id="lowTodo"
                            notCompletedTodo={fullTextLowNotCompleted}
                            completedTodo={fullTextLowCompleted}
                            priority="LOW"
                            dispatch={dispatch}
                        />
                        <DisplayTodoGroup
                            id="mediumTodo"
                            notCompletedTodo={fullTextMediumNotCompleted}
                            completedTodo={fullTextMediumCompleted}
                            priority="MEDIUM"
                            dispatch={dispatch}
                        />
                        <DisplayTodoGroup
                            id="highTodo"
                            notCompletedTodo={fullTextHighNotCompleted}
                            completedTodo={fullTextHighCompleted}
                            priority="HIGH"
                            dispatch={dispatch}
                        />
                    </div>
                </div>
            ) : null}
            {/* Check if both isCompletedFilter and fulltextFilter is applied */}
            {isCompletedFilter && searchText !== "" && searchText !== null ? (
                <div id="bothFilter">
                    <div id="todoTable" className="flex">
                        <DisplayTodoGroup
                            id="lowTodo"
                            notCompletedTodo={null}
                            completedTodo={fullTextLowCompleted}
                            priority="LOW"
                            dispatch={dispatch}
                        />
                        <DisplayTodoGroup
                            id="mediumTodo"
                            notCompletedTodo={null}
                            completedTodo={fullTextMediumCompleted}
                            priority="MEDIUM"
                            dispatch={dispatch}
                        />
                        <DisplayTodoGroup
                            id="highTodo"
                            notCompletedTodo={null}
                            completedTodo={fullTextHighCompleted}
                            priority="HIGH"
                            dispatch={dispatch}
                        />
                    </div>
                </div>
            ) : null}
            {/* Show this only if no filters are applied */}
            {!isCompletedFilter &&
            (searchText === "" || searchText === null) ? (
                <div id="todoTable" className="flex">
                    <DisplayTodoGroup
                        id="lowTodo"
                        notCompletedTodo={notCompletedLowTodo}
                        completedTodo={completedLowTodo}
                        priority="LOW"
                        dispatch={dispatch}
                    />
                    <DisplayTodoGroup
                        id="mediumTodo"
                        notCompletedTodo={notCompletedMediumTodo}
                        completedTodo={completedMediumTodo}
                        priority="MEDIUM"
                        dispatch={dispatch}
                    />
                    <DisplayTodoGroup
                        id="highTodo"
                        notCompletedTodo={notCompletedHighTodo}
                        completedTodo={completedHighTodo}
                        priority="HIGH"
                        dispatch={dispatch}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default TodoList;
