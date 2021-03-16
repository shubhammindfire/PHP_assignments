<?php
session_start();
include_once("./backend/validate.php");
?>
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Form validation assignment</title>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

  <link rel="stylesheet" type="text/css" href="./assets/css/index.css" />
</head>

<body>
  <div class="card container p-4 my-5">
    <h2 class="jumbotron text-center p-2 mx-5">Registration Form</h2>

    <!--
- Name (textfield)
- Date of Birth (datepicker)
- Gender (radio buttons)
- Email Address (email)
- Contact Number (number)
- Skills (checkbox)
- Profile Photo (file)
- About (textarea)
- Address (textarea)
- Educational Qualification (single selection dropdown)
- Interests Area (multi selection dropdown)
- Professional Links (textfield)
-->

    <form class="needs-validation" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST" enctype="multipart/form-data" novalidate>
      <!-- name -->
      <div class="form-group">
        <label for="name">Name:</label><strong> *</strong>
        <input type="text" class="form-control" id="name" placeholder="Enter name" name="name" value="<?php echo $name ?>" required />
        <?php if (isset($nerror)) { ?>
          <p><?php echo $nerror ?></p>
        <?php } ?>
        <div class="valid-feedback <?php if (isset($nameValid) && $nameValid === 'Valid') echo "d-block" ?>" id="name-valid">Valid.</div>
        <div class="invalid-feedback <?php if (isset($nameInvalid) && $nameInvalid !== '') echo "d-block" ?>" id="name-invalid">
          <?php if (isset($nameInvalid) && $nameInvalid !== '') echo $nameInvalid ?>
        </div>
      </div>
      <!-- Date of birth -->
      <div class="form-group">
        <label for="dob">Date of birth: </label><strong> *</strong>
        <input type="date" id="dob" name="dob" value="<?php echo $dob ?>" />
        <div class="valid-feedback <?php if (isset($dobValid) && $dobValid === 'Valid') echo "d-block" ?>" id="dob-valid">Valid.</div>
        <div class="invalid-feedback <?php if (isset($dobInvalid) && $dobInvalid !== '') echo "d-block" ?>" id="dob-invalid">
          <?php if (isset($dobInvalid) && $dobInvalid !== '') echo $dobInvalid ?>
        </div>
        <div class="valid-feedback" id="dob-valid">Valid.</div>
        <div class="invalid-feedback" id="dob-invalid">
          Please fill out this field.
        </div>
      </div>
      <!-- gender -->
      <div class="form-group">
        <label for="gender">Gender:</label><strong> *</strong><br />
        <div class="form-check-inline">
          <label class="form-check-label" for="male">
            <input type="radio" class="form-check-input" id="male" name="gender" value="Male" <?php if ($gender === "male")  echo "checked" ?> />Male
          </label>
        </div>
        <div class="form-check-inline">
          <label class="form-check-label" for="female">
            <input type="radio" class="form-check-input" id="female" name="gender" value="Female" <?php if ($gender === "female")  echo "checked" ?> />Female
          </label>
        </div>
        <div class="form-check-inline">
          <label class="form-check-label" for="others">
            <input type="radio" class="form-check-input" id="others" name="gender" value="Others" <?php if ($gender === "others")  echo "checked" ?> />Others
          </label>
        </div>
        <div class="valid-feedback <?php if (isset($genderValid) && $genderValid !== '') echo "d-block" ?>" id="gender-valid">Valid.</div>
        <div class="invalid-feedback <?php if (isset($genderInvalid) && $genderInvalid !== '') echo "d-block" ?>" id="gender-invalid">
          <?php if (isset($genderInvalid) && $genderInvalid !== '') echo $genderInvalid ?>
        </div>
      </div>
      <!-- Email -->
      <div class="form-group">
        <label for="email">Email: </label><strong> *</strong>
        <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" value="<?php echo $email ?>" required />
        <div class="valid-feedback <?php if (isset($emailValid) && $emailValid !== '') echo "d-block" ?>" id="email-valid">Valid.</div>
        <div class="invalid-feedback <?php if (isset($emailInvalid) && $emailInvalid !== '') echo "d-block" ?>" id="email-invalid">
          <?php if (isset($emailInvalid) && $emailInvalid !== '') echo $emailInvalid ?>
        </div>
      </div>

      <!-- Contact number -->
      <div class="form-group">
        <label for="contact">Contact Number: </label><strong> *</strong>
        <input type="tel" class="form-control" id="contact" placeholder="Enter contact number" name="contact" value="<?php echo $contact ?>" required />
        <div class="valid-feedback <?php if (isset($contactValid) && $contactValid !== '') echo "d-block" ?>" id="contact-valid">Valid.</div>
        <div class="invalid-feedback <?php if (isset($contactInvalid) && $contactInvalid !== '') echo "d-block" ?>" id="contact-invalid">
          <?php if (isset($contactInvalid) && $contactInvalid !== '') echo $contactInvalid ?>
        </div>
      </div>
      <!-- Skills -->
      <div class="form-group">
        <label for="skills">Skills: </label><strong> *</strong>
        <div class="checkbox">
          <label><input type="checkbox" name="skills[]" value="React" <?php if ((isset($_POST['submit'])) && in_array("react", $skills)) echo "checked" ?> />React</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox" name="skills[]" value="Angular" <?php if ((isset($_POST['submit'])) && in_array("angular", $skills)) echo "checked" ?> />Angular</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox" name="skills[]" value="Product design" <?php if ((isset($_POST['submit'])) && in_array("product design", $skills)) echo "checked" ?> />Product Design</label>
        </div>
        <div class="valid-feedback <?php if (isset($skillsValid) && $skillsValid !== '') echo "d-block" ?>" id="skills-valid">Valid.</div>
        <div class="invalid-feedback <?php if (isset($skillsInvalid) && $skillsInvalid !== '') echo "d-block" ?>" id="skills-invalid">
          <?php if (isset($skillsInvalid) && $skillsInvalid !== '') echo $skillsInvalid ?>
        </div>
      </div>

      <!-- Profile photo -->
      <div class="form-group">
        <label for="profile">Profile Photo: </label><strong> *</strong>
        <input type="file" class="form-control-file" id="profile" name="profile" accept="image/*" />
        <div class="invalid-feedback <?php if (isset($profileInvalid) && $profileInvalid !== '') echo "d-block" ?>" id="profile-invalid">
          <?php if (isset($profileInvalid) && $profileInvalid !== '') echo $profileInvalid ?>
        </div>
      </div>
      <!-- About  -->
      <div class="form-group">
        <label for="about">About: </label>
        <textarea class="form-control" id="about" name="about" rows="3"><?php echo $about ?></textarea>
      </div>
      <!-- Address -->
      <div class="form-group">
        <label for="address">Address: </label><strong> *</strong>
        <textarea class="form-control" id="address" name="address" rows="3"><?php echo $address ?></textarea>
        <div class="valid-feedback <?php if (isset($addressValid) && $addressValid !== '') echo "d-block" ?>" id="address-valid">Valid.</div>
        <div class="invalid-feedback <?php if (isset($addressInvalid) && $addressInvalid !== '') echo "d-block" ?>" id="address-invalid">
          <?php if (isset($addressInvalid) && $addressInvalid !== '') echo $addressInvalid ?>
        </div>
      </div>
      <!-- Educational Qualification -->
      <div class="form-group">
        <label for="education">Educational Qualification: </label>
        <select class="form-control" id="education" name="education">
          <option value="Bachelors" <?php if ($education && $education === "bachelors")  echo "selected" ?>>Bachelors</option>
          <option value="Masters" <?php if ($education && $education === "masters")  echo "selected" ?>>Masters</option>
          <option value="PhD" <?php if ($education && $education === "phd")  echo "selected" ?>>PhD</option>
        </select>
      </div>
      <!-- Interests -->
      <div class="form-group">
        <label for="interests">Interests: </label>
        <select multiple class="form-control" id="interests" name="interests[]">
          <option value="Web dev" <?php if (in_array("web dev", $interests))  echo "selected" ?>>Web Dev</option>
          <option value="Mobile dev" <?php if (in_array("mobile dev", $interests))  echo "selected" ?>>Mobile Dev</option>
          <option value="Data science" <?php if (in_array("data science", $interests))  echo "selected" ?>>Data Science</option>
          <option value="Machine learning" <?php if (in_array("machine learning", $interests))  echo "selected" ?>>Machine Learning</option>
          <option value="Design" <?php if (in_array("design", $interests))  echo "selected" ?>>Design</option>
        </select>
      </div>
      <!-- Professional links -->
      <div class="form-group">
        <label for="links">Professional links: </label><strong> *</strong>
        <input type="text" class="form-control" id="links" placeholder="Enter Professional Links" name="links" value="<?php echo $links ?>" required />
        <div class="valid-feedback <?php if (isset($linksValid) && $linksValid !== '') echo "d-block" ?>" id="links-valid">Valid.</div>
        <div class="invalid-feedback <?php if (isset($linksInvalid) && $linksInvalid !== '') echo "d-block" ?>" id="links-invalid">
          <?php if (isset($linksInvalid) && $linksInvalid !== '') echo $linksInvalid ?>
        </div>
      </div>

      <!-- submit -->
      <button type="submit" name="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>

</html>