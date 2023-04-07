<?php
// Connect to the database
$dbhost = 'localhost'; // Replace with your database host
$dbname = 'mydatabase'; // Replace with your database name
$dbuser = 'myusername'; // Replace with your database username
$dbpass = 'mypassword'; // Replace with your database password

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Retrieve the user's input
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Check if the username already exists
  $query = "SELECT * FROM users WHERE username = '$username'";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    // Display an error message if the username already exists
    echo "Username already exists. Please choose a different username.";
  } else {
    // Insert the new user's information into the database
    $query = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
    $result = $conn->query($query);

    if ($result) {
      // Display a success message if the user has been added to the database
      echo "User registration successful.";
    } else {
      // Display an error message if the user could not be added to the database
      echo "Error: " . $query . "<br>" . $conn->error;
    }
  }

  // Close the database connection
  $conn->close();
}
?>
