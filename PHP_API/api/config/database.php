<?php
require_once("env.php");
// require_once($_SERVER['DOCUMENT_ROOT'] . "/api/config/env.php");

$dbname = "api_db";
$tablename = "categories";

// establish a connection
$conn = new mysqli($servername, $username, $password, $dbname);

function getData()
{
    global $conn, $tablename;
    if (connect($conn) === true) {
        // check if table exists
        if (table_exists($conn, $tablename) === true) {
            selectData($conn, $tablename);
        } else {
            die("ERROR: Table doesn't exist");
        }
    } else {
        die("ERROR: Connection error");
    }
}

function connect($conn)
{
    if ($conn->connect_error) {
        return false;
    }
    return true;
}

function table_exists($conn, $tablename)
{
    if ($conn->query("DESCRIBE $tablename")) {
        return true;
    }
    return false;
}

function selectData($conn, $tablename)
{
    $query = "SELECT * FROM $tablename";

    $result = $conn->query($query);
    $categories = array();
    $categories_arr["records"] = array();

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            $category_item = array(
                "id" => $row["id"],
                "name" => $row["name"],
                "description" => $row["description"],
                "created" => $row["created"],
                "modified" => $row["modified"]
            );

            array_push($categories_arr["records"], $category_item);
        }
        // set response code - 200 OK
        http_response_code(200);

        // show products data in json format
        echo json_encode($categories_arr);
    } else {
        // set response code - 404 Not found
        http_response_code(404);

        // tell the user no products found
        echo json_encode(
            array("message" => "No products found.")
        );
    }
}
