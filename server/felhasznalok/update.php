<?php 
require(dirname(__DIR__) . '/includes/config.php');

$post = json_decode(file_get_contents('php://input'), true);

if (!$_GET['id']) {
    $result = ['error' => [
        'message' => 'Ervenytelen azonosito.',
    ]]; 
    die(json_encode($result));
}
$db = new Database();
$db->safeSQLParams($post);
$id = $_GET['id'];
$db->safeSQLParams($id);
$query = "UPDATE `kartyak` SET 
            `vezeteknev`='" . $post['vezeteknev'] . "', 
            `keresztnev`='" . $post['keresztnev'] . "', 
            `rendfokozat`='" . $post['rendfokozat'] . "', 
            `latogatoi_csoport`='" . $post['latogatoi_csoport'] . "', 
            `img`='" . $post['img'] . "' 
          WHERE `id`='" . $id . "'";

echo $db->save($query);
?>