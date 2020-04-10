<?php 
require(dirname(dirname(__DIR__)) . '/includes/config.php');

$post = json_decode(file_get_contents('php://input'), true);
// print_r($post);

//1. $post atalakitasa olyan adatta ami a tablaban jo (ervenyesseg kezelese)
if (!$_GET['id']) {
    $result = ['error' => [
        'message' => 'ervenytelen azonosito: '. !$_GET['id'],
    ]]; 
    die(json_encode($result));
}
$query = "UPDATE `Card` SET `elotag`='".$post["elotag"]."', `vezeteknev`='".$post['vezeteknev']."', `keresztnev`='".$post['keresztnev']."', `intezmeny_nev`='".$post['intezmeny_nev']."', `rendfokozat`='".$post['rendfokozat']."', `img`='".$post['img']."' WHERE `id`='".$_GET['id']."'";

//2. $post eltarolasa az adatbazisban
$db = new Database();
echo $db->save($query);
?>