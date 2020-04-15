<?php
    require(dirname(__DIR__) . '/includes/config.php');

    $post = json_decode(file_get_contents('php://input'), true);

    if (!$post['nev'] || !$post['jelszo']) {
        $result = ['error' => [
            'message' => 'Kérem töltse ki a mind a felhasznaloinév es a jelszo mezőket.',
        ]];
        die(json_encode($result));
    }
    $db = new Database();
    $db->safeSQLParams($post);
    $query = 'INSERT INTO `felhasznalok` (
                `nev`,
                `jelszo`
              ) VALUES (
                "' . $post['nev'] . '",
                "' . md5($post['jelszo']) . '"
              )';

    echo $db->save($query);
?>