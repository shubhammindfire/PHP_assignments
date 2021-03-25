<?php

require_once("../models/queries.php");

$queries = new Queries();

echo json_encode($queries->deleteTodo($_POST['id']));
