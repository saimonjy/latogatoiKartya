<?php 
require(dirname(dirname(__DIR__)) . '/includes/config.php');
//a megjelenitett kartya sorszamat fogadom az view-tol. tolom a kartyat aminek a id == sorszammal.
//1. $post atalakitasa olyan adatta ami a tablaban jo (ervenyesseg kezelese)
if (!$_GET['id']) {
    //TODO: ezt a hibauzenet format hasznald!!! csereld minden php
    $result = ['error' => [
        'message' => 'ervenytelen azonosito: '. $_GET['id'],
    ]];  
    die(json_encode($result));
}
$get = $_GET['id'];
$db = new Database();

$db->safeSQLParams($get);
$query = 'DELETE FROM Card WHERE Card.id = '.$get;

//2. $post eltarolasa az adatbazisban

echo $db->delete($query);
?>