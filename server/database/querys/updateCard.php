<?php 
require(dirname(dirname(__DIR__)) . '/includes/config.php');

$post = json_decode(file_get_contents('php://input'), true);

if (!$_GET['id']) {
    $result = ['error' => [
        'message' => 'ervenytelen azonosito: '. !$_GET['id'],
    ]]; 
    die(json_encode($result));
}
$db = new Database();
$db->safeSQLParams($post);
$query = "UPDATE `Card` SET `elotag`='".$post["elotag"]."', `vezeteknev`='".$post['vezeteknev']."', `keresztnev`='".$post['keresztnev']."', `intezmeny_nev`='".$post['intezmeny_nev']."', `rendfokozat`='".$post['rendfokozat']."', `img`='".$post['img']."' WHERE `id`='".$_GET['id']."'";

echo $db->save($query);
?>