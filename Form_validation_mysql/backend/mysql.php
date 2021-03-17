<?php
require_once("./backend/env.php");

$dbname = "work";
$tablename = "ResumeData";

// establish a connection
$conn = new mysqli($servername, $username, $password, $dbname);

if (connect($conn) === true) {
    // check if table already exists
    if (table_exists($conn, $tablename) === true) {
        if (insertIntoTable($conn, $tablename) === true) {
            echo "insert into table true";
        } else {
            echo "insert into table false";
            die("ERROR WHEN INSERTING INTO TABLE");
        }
    } else {
        if (createTable($conn, $tablename)) {
            if (insertIntoTable($conn, $tablename) === true) {
                echo "insert into table true";
            } else {
                echo "insert into table false";
                die("ERROR WHEN INSERTING INTO TABLE");
            }
        } else {
            die("ERROR IN CREATE TABLE");
            echo "ERROR IN CREATE TABLE";
        }
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



function createTable($conn, $tablename)
{
    $query = "CREATE TABLE $tablename (
        id INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        dob DATE NOT NULL,
        gender ENUM('M','F','O'),
        email VARCHAR(50) NOT NULL,
        contact VARCHAR(10) NOT NULL,
        skills VARCHAR(50) NOT NULL,
        profile_image VARCHAR(200) NOT NULL,
        about TEXT,
        address TEXT NOT NULL,
        education VARCHAR(15),
        interests VARCHAR(100),
        links VARCHAR(50) NOT NULL,
        timestamp DATETIME NOT NULL DEFAULT NOW()
    )";

    if ($conn->query($query) === TRUE) {
        return true;
    } else {
        return false;
    }
}

function insertIntoTable($conn, $tablename)
{
    global $gender, $name, $dob, $email, $contact, $skills, $target_file, $about, $address, $education, $interests, $links;

    $GENDER = ($gender === "male") ? 'M' : (($gender === "female") ? 'F' : 'O');
    $SKILLS = implode(", ", $skills);
    $INTERESTS = implode(", ", $interests);

    $query = "INSERT INTO $tablename (
        name,
        dob,
        gender,
        email,
        contact,
        skills,
        profile_image,
        about,
        address,
        education,
        interests,
        links
        ) VALUES(
        '$name',
        STR_TO_DATE('$dob','%Y-%m-%d'),
        '$GENDER',
        '$email',
        '$contact',
        '$SKILLS',
        '$target_file',
        '$about',
        '$address',
        '$education',
        '$INTERESTS',
        '$links'
    )";

    if ($conn->query($query) === TRUE) {
        return true;
    } else {
        return false;
    }
}
