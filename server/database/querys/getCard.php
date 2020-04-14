<?php 
    require(dirname(dirname(__DIR__)) . '/includes/config.php');

    if (!$_GET['id']) {
        //TODO: ezt a hibauzenet format hasznald!!! csereld minden php
        $result = ['error' => [
            'message' => 'ervenytelen azonosito: '. $_GET['id'],
        ]];  
        die(json_encode($result));
    }

    $db = new Database();
    $id = $_GET['id'];
    $db->safeSQLParams($id);
    $query = 'SELECT * FROM `kartyak` WHERE `id` = ("' . $id .'")';
    echo $db->select($query);
?>