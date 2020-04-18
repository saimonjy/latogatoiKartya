<?php
    require(dirname(__DIR__) . '/includes/config.php');
    $query = 'SELECT 
                latogatoi_csoportok.nev,
                kartyak.id,
                kartyak.vezeteknev,
                kartyak.keresztnev,
                kartyak.img,
                kartyak.rendfokozat
              FROM 
              latogatoi_csoportok INNER JOIN kartyak 
              on latogatoi_csoportok.id = kartyak.latogatoi_csoport
              ORDER BY `id` DESC';
    $db = new Database();
    echo $db->list($query);
?>
