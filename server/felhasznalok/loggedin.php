<?php
    require(dirname(__DIR__) . '/includes/config.php');

    echo '{ "loggedIn": ' .
        (isset($_SESSION['felhasznalo']) ? 'true' : 'false')
    . ' }';
?>
