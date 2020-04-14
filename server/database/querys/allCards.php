<?php
    require(dirname(dirname(__DIR__)) . '/includes/config.php');
    $query = 'SELECT * FROM `kartyak` ORDER BY `id` DESC';
    $db = new Database();
    echo $db->select($query);
?>
