<?php
session_start();

// Sanitize user input
$username = filter_input(INPUT_POST, 'username');
$password = filter_input(INPUT_POST, 'password');

// Connect to the database
require_once __DIR__ . '/vendor/autoload.php';
$client = new MongoDB\Client('mongodb+srv://savittumuluri:Savit123@savitdb1.x6zw2zv.mongodb.net/');
$collection = $client->FinanciallyFit->Users;
$document = $collection->findOne(['username' => $username, 'password' => $password]);
//var_dump($document['password']);
if (is_null($document)) {
    echo  "Login Failed for ". $username;
    session_abort();
} else {
    $_SESSION["name"] = $document['fullname'];
    header('Location: index.php');
}



?>
