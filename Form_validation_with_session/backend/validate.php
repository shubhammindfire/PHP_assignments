
  <?php
    // define variables and set to empty values
    $name = $dob = $gender = $email = $contact = $profile = $about = $address = $links = "";
    $skills = $interests = [];
    $nameValid = $dobValid = $genderValid = $emailValid = $contactValid = $skillsValid = $addressValid = $linksValid = "";
    $nameInvalid = $dobInvalid = $genderInvalid = $emailInvalid = $contactInvalid = $skillsInvalid = $profileInvalid = $addressInvalid = $linksInvalid = "";
    $target_file = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $_SESSION["name"] = $name = test_input($_POST["name"]);
        $_SESSION["dob"] = $dob = test_input($_POST["dob"]);
        $_SESSION["gender"] = $gender = test_input($_POST["gender"]);
        $_SESSION["email"] = $email = test_input($_POST["email"]);
        $_SESSION["contact"] = $contact = test_input($_POST["contact"]);
        $skills = $_POST["skills"];
        $_SESSION["address"] = $address = test_input($_POST["address"]);
        $profile = test_input($_POST["profile"]);
        $_SESSION["about"] = $about = test_input($_POST["about"]);
        $_SESSION["education"] = $education = test_input($_POST["education"]);
        $interests = $_POST["interests"];
        $_SESSION["links"] = $links = test_input($_POST["links"]);
        
        validate_name($name, $nameValid, $nameInvalid);
        validate_dob($dob, $dobValid, $dobInvalid);
        validate_gender($gender, $genderValid, $genderInvalid);
        validate_email($email, $emailValid, $emailInvalid);
        validate_contact($contact, $contactValid, $contactInvalid);
        validate_skills($skills, $skillsValid, $skillsInvalid);
        validate_profile($profileInvalid);
        validate_address($address, $addressValid, $addressInvalid);
        validate_links($links, $linksValid, $linksInvalid);
        
        if (!$nameInvalid && !$dobInvalid && !$genderInvalid && !$emailInvalid && !$contactInvalid && !$skillsInvalid && !$profileInvalid && !$addressInvalid && !$linksInvalid) {
            $_SESSION["interests"] = implode(", ", $interests);
            $_SESSION["skills"] = implode(", ", $skills);
            $_SESSION["profile"] = $target_file;
            header('Location: ./success.php');
            exit();
        }
    }


    function test_input($data)
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    // validate name
    function validate_name(&$name, &$nameValid, &$nameInvalid)
    {
        if (empty($name) || $name === '') {
            $nameInvalid = "*Please fill this field";
        } else {
            $nameValid = "Valid";
        }
    }

    // validate dob
    function validate_dob(&$dob, &$dobValid, &$dobInvalid)
    {
        if (empty($dob) || $dob === '') {
            $dobInvalid = "*Please fill this field";
        } else {
            $date_arr  = explode('-', $dob);
            if (checkdate($date_arr[1], $date_arr[2], $date_arr[0])) {
                $test_date =  mktime(0, 0, 0, $date_arr[1], $date_arr[2], $date_arr[0]);
                if ($date_arr < 1900 || time() <=  $test_date)
                    $dobInvalid = "Date must be between 1900 and current date";
            } else {
                $dobValid = "Valid";
            }
        }
    }

    // validate gender
    function validate_gender(&$gender, &$genderValid, &$genderInvalid)
    {
        if (empty($gender)) {
            $genderInvalid = "*Please fill this field";
        } else {
            $genderValid = "Valid";
        }
    }

    // validate email
    function validate_email(&$email, &$emailValid, &$emailInvalid)
    {
        if (empty($email) || $email === '') {
            $emailInvalid = "*Please fill this field";
        } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailInvalid = "*Please enter a valid email";
        } else {
            $emailValid = "Valid";
        }
    }

    // validate contact
    function validate_contact(&$contact, &$contactValid, &$contactInvalid)
    {
        if (empty($contact) || $contact === '') {
            $contactInvalid = "*Please fill this field";
        } else if (!preg_match('/^\d{10}$/', $contact)) {
            $contactInvalid = "*Please enter a valid number";
        } else {
            $contactValid = "Valid";
        }
    }

    // validate skills
    function validate_skills(&$skills, &$skillsValid, &$skillsInvalid)
    {
        if (empty($skills)) {
            $skillsInvalid = "*Please select one or many of these fields";
        } else {
            $skillsValid = "Valid";
        }
    }

    // validate profile
    function validate_profile(&$profileInvalid)
    {

        $target_dir = "uploads/";
        global $target_file;
        $target_file = $target_dir . basename($_FILES["profile"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Check if image file is a actual image or fake image
        if (isset($_POST["submit"])) {
            $check = getimagesize($_FILES["profile"]["tmp_name"]);
            if ($check !== false) {
                // $profileInvalid = "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                $profileInvalid = "File is not an image.";
                $uploadOk = 0;
            }
        }

        // Check if file already exists
        if (file_exists($target_file)) {
            $profileInvalid =  "Sorry, file already exists.";
            $uploadOk = 0;
        }

        // Check file size
        if ($_FILES["profile"]["size"] > 500000) {
            $profileInvalid =  "Sorry, your file is too large.";
            $uploadOk = 0;
        }

        // Allow certain file formats
        if (
            $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif"
        ) {
            $profileInvalid =  "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            $profileInvalid =  "Sorry, your file was not uploaded.";
            // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["profile"]["tmp_name"], $target_file)) {
                // image done successfully
            } else {
                $profileInvalid =  "Sorry, there was an error uploading your file.";
            }
        }
    }

    // validate address
    function validate_address(&$address, &$addressValid, &$addressInvalid)
    {
        if (empty($address) || $address === '') {
            $addressInvalid = "*Please fill this field";
        } else {
            $addressValid = "Valid";
        }
    }

    // validate links
    function validate_links(&$links, &$linksValid, &$linksInvalid)
    {
        if (empty($links) || $links === '') {
            $linksInvalid = "*Please fill this field";
        } else if (!filter_var($links, FILTER_VALIDATE_URL)) {
            $linksInvalid = "*Please enter a valid link.Don't forget to add http://";
        } else {
            $linksValid = "Valid";
        }
    }

    ?>