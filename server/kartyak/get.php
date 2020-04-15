<?php 
    require(dirname(__DIR__) . '/includes/config.php');

    if (!$_GET['id']) {
        $result = ['error' => [
            'message' => 'ervenytelen azonosito!',
        ]];  
        die(json_encode($result));
    }

    $db = new Database();
    $id = $_GET['id'];
    $db->safeSQLParams($id);
    $query = 'SELECT * FROM `kartyak` WHERE `id` = "' . $id .'"';
    echo $db->select($query);
?>