<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Authorization, X-Requested-With');

require_once("../models/queries.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $queries = new Queries();

    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $column = $data['column'];
    $newValue = $data['newValue'];

    echo json_encode($queries->updateTodo($id, $column, $newValue));

    exit;
}
