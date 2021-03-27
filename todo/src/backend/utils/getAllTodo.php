<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once("../models/queries.php");


$q = new Queries();

echo json_encode($q->getAllTodo());
