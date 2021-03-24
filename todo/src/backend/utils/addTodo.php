<?php

// required headers
// header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/x-www-form-urlencoded');
// header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, 
// Access-Control-Allow-Methods, Content-Type, Authorization, X-Requested-With');

require_once("../models/queries.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array("message" => "Action Not Allowed"));
    exit;
}

$queries = new Queries();

echo "title = " . $_POST["title"] . " priority = " . $_POST["priority"] . " isCompleted = " . $_POST["isCompleted"];

echo json_encode($queries->addTodo($_POST['title'], $_POST['priority'], $_POST['isCompleted']));
