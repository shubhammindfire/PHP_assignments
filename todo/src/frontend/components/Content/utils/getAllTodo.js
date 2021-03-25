function getAllTodo() {
    let result = {};

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./../../../backend/utils/getAllTodo.php", true);
    xhttp.send();
    xhttp.onload = function () {
        if (this.status === 200) {
            result = JSON.parse(this.responseText);
        }
    };

    return result;
}

export default getAllTodo;
