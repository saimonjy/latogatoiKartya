<?php
    require(dirname(__DIR__) . '/includes/config.php');

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
                `vezeteknev`,
                `keresztnev`,
                `img`,
                `rendfokozat`,
                `latogatoi_csoport`
              ) VALUES (
                "' . $post['vezeteknev'] . '",
                "' . $post['keresztnev'] . '",
                "' . $post['img'] . '",
                "' . $post['rendfokozat'] . '",
                "' . $post['latogatoi_csoport'] . '"
              )';

    echo $db->save($query);
?>