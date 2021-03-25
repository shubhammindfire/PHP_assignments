<?php

require_once("../models/queries.php");

$queries = new Queries();

echo json_encode($queries->updateTodo($_POST['id'], $_POST['column'], $_POST['newValue']));
