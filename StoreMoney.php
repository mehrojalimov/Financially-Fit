<?php
session_start();

$label = filter_input(INPUT_POST, 'statement');
$money = filter_input(INPUT_POST, 'spending');

require_once __DIR__ . '/vendor/autoload.php';
$client = new MongoDB\Client('mongodb+srv://savittumuluri:Savit123@savitdb1.x6zw2zv.mongodb.net/');
$collection = $client->FinanciallyFit->Users;
$document = $collection->findOne(['username' => $_SESSION['user']]);

$collection -> updateOne(  
    array('username' => $_SESSION['user']),
    array('$push' => array("moneyInfo" => array($label, $money)))
);

header('Location: SpendingTracker.html');
?>