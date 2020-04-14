<?php
require(dirname(dirname(__DIR__)) . '/includes/config.php');
$query = 'SELECT * FROM Card  ORDER BY id DESC';
$db = new Database();
echo $db->select($query);
?>
