<?php
session_start();

// Connect to the database

require_once __DIR__ . '/vendor/autoload.php';
$client = new MongoDB\Client('mongodb+srv://savittumuluri:Savit123@savitdb1.x6zw2zv.mongodb.net/');
$collection = $client->FinanciallyFit->Users;

$username = filter_input(INPUT_POST, 'new_username');
$fullname = filter_input(INPUT_POST, 'new_name');
$password = filter_input(INPUT_POST, 'new_password');



$document = $collection->findOne(['username' => $username]);

// Check if the form has been submitted
if ( is_null($document)) {
  // Retrieve the user's input
  $insertOneResult = $collection->insertOne([
    'username' => $username,
    'fullname' => $fullname,
    'password' => $password,
    
  ]);
  $_SESSION['name'] = $fullname;
  header('Location: index.php');

  } else {
    header('Location: Login.php');
  }

?>
