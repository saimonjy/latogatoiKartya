<?php 
    require(dirname(__DIR__) . '/includes/config.php');

    unset($_SESSION['felhasznalo']);

    echo '{ "sikeres": true }';
?>