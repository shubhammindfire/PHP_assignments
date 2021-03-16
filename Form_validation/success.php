<!DOCTYPE HTML>
<html>

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Success page</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <link rel="stylesheet" type="text/css" href="./../assets/css/index.css" />
</head>

<body>

    <div class="card container p-4 my-5">
        <h2 class="text-center p-2 mx-5">Form successfully Submitted</h2>
        <h2 class="text-center p-2 mx-5">Thank You</h2>
        <img class="m-2" src="<?php echo $_GET["target_file"] ?>" alt="" srcset="" />
        <p>Name: <?php echo $_GET["name"] ?></p>
        <p>DOB: <?php echo $_GET["dob"] ?></p>
        <p>Gender: <?php echo $_GET["gender"] ?></p>
        <p>Email: <?php echo $_GET["email"] ?></p>
        <p>Contact: <?php echo $_GET["contact"] ?></p>
        <p>Skills: <?php echo $_GET["skills"] ?></p>
        <p>About: <?php echo ($_GET["about"]) ? $_GET["about"] : " --- " ?></p>
        <p>Address: <?php echo $_GET["address"] ?></p>
        <p>Education: <?php echo $_GET["education"] ?></p>
        <p>Interests: <?php echo ($_GET["interests"]) ? $_GET["interests"] : " --- " ?></p>
        <p>Links: <?php echo $_GET["links"] ?></p>
    </div>

</html>
