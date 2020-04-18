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
    $query = 'SELECT 
                latogatoi_csoportok.nev, 
                kartyak.id, kartyak.vezeteknev, 
                kartyak.keresztnev,kartyak.img, 
                kartyak.rendfokozat 
              FROM 
                kartyak 
              INNER JOIN 
                latogatoi_csoportok 
            on 
                kartyak.latogatoi_csoport= latogatoi_csoportok.id 
              WHERE kartyak.id = "' . $id .'"';
    echo $db->select($query);
?>