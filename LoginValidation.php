<?php
session_start();

// Sanitize user input
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

// Connect to the database
$host = 'localhost';
$user = 'your_username';
$pass = 'your_password';
$dbname = 'your_database_name';
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $user, $pass);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit;
}

// Fetch the user's login credentials from the database
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

// Verify the password and redirect the user if the login is successful
if ($user && password_verify($password, $user['password'])) {
    // Login successful, redirect the user to the homepage
    header('Location: index.html');
    exit;
} else {
    // Login unsuccessful, display an error message
    echo 'Incorrect username or password.';
}
