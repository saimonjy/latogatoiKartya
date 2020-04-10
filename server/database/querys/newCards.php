<?php 
require(dirname(dirname(__DIR__)) . '/includes/config.php');

$post = json_decode(file_get_contents('php://input'), true);
//1. $post atalakitasa olyan adatta ami a tablaban jo (ervenyesseg kezelese)
if (!$post['vezeteknev']) {
    $result = ['error' => [
        'message' => 'ervenytelen azonosito: '. $post['vezeteknev'],
    ]];  
    die(json_encode($result));
}

$query = 'INSERT INTO Card (elotag, vezeteknev, keresztnev,intezmeny_nev,img,rendfokozat)
         VALUES ("' . $post['elotag'] . '", "' . $post['vezeteknev'] . '","' . $post['keresztnev'] . '", "' . $post['intezmeny_nev'] . '", "' . $post['img'] . '", "' . $post['rendfokozat'] . '"
                 )';

// $stmt = $mysqli->prepare("SELECT * FROM myTable WHERE name = ? AND age = ?");
// $stmt->bind_param("si", $_POST['name'], $_POST['age']);
// $stmt->execute();

//2. $post eltarolasa az adatbazisban
$db = new Database();
echo $db->save($query);
?>