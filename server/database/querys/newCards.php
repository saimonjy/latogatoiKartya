<?php
    require(dirname(dirname(__DIR__)) . '/includes/config.php');

    $post = json_decode(file_get_contents('php://input'), true);

    if (!$post['vezeteknev']) {
        $result = ['error' => [
            'message' => 'Kérem töltse ki a vezetéknév mezőt.',
        ]];
        die(json_encode($result));
    }
    $db = new Database();
    $db->safeSQLParams($post);
    $query = 'INSERT INTO `kartyak` (
                `elotag`,
                `vezeteknev`,
                `keresztnev`,
                `intezmeny_nev`,
                `img`,
                `rendfokozat`
              ) VALUES (
                "' . $post['elotag'] . '", 
                "' . $post['vezeteknev'] . '",
                "' . $post['keresztnev'] . '",
                "' . $post['intezmeny_nev'] . '",
                "' . $post['img'] . '",
                "' . $post['rendfokozat'] . '"
              )';

    echo $db->save($query);
?>