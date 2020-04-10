<?php
require(dirname(dirname(__DIR__)) . '/includes/config.php');
$query = 'SELECT id,elotag,vezeteknev,keresztnev,intezmeny_nev,rendfokozat FROM Card';
$db = new Database();
echo $db->select($query);
?>
