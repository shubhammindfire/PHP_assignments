import React from "react";

function Card() {
    function handleClick(e) {
        console.log("The link was clicked.");
        alert("Press");
    }
    return (
        <div className="rounded w-80 m-4 bg-gray-50 shadow-lg p-6 align-middle">
            <input
                type="text"
                placeholder="Enter todo"
                size="25"
                className="block m-auto px-2 border-gray-400 focus:border-black border-2 leading-10 rounded-md"
            />
            <button
                type="button"
                onClick={handleClick}
                className="block float-right p-2 mt-4 mx-2 bg-green-600 text-white rounded-md"
            >
                Add Todo
            </button>
        </div>
    );
}

export default Card;
