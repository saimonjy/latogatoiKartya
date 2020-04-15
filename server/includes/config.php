<?php
session_start();
$projectRoot = dirname(__DIR__);
$mysqlconfig = [
    'host' => 'localhost',
    'user' => 'root',
    'password' => '',
    'db_name' => 'latogatoi',
];
require($projectRoot . '/includes/database.php');

?>