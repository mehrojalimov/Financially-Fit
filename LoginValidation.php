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

$_SESSION['error2'] = false;
if (is_null($document)) {
    $_SESSION['error2'] = true;
    $_SESSION['error1'] = false;
    header('Location: Login.php');
} else {
    $_SESSION["name"] = $document['fullname'];
    $_SESSION["user"] = $document['username'];
    header('Location: index.php');
}
?>
