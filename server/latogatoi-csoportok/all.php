<?php
    require(dirname(__DIR__) . '/includes/config.php');
    $query = 'SELECT * FROM `latogatoi_csoportok` ORDER BY `nev` ASC';
    $db = new Database();
    echo $db->select($query);
?>
