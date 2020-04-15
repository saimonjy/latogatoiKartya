<?php
    require(dirname(__DIR__) . '/includes/config.php');

    $post = json_decode(file_get_contents('php://input'), true);

    if (!$post['nev']) {
        $result = ['error' => [
            'message' => 'Kérem töltse ki a név mezőt.',
        ]];
        die(json_encode($result));
    }
    $db = new Database();
    $db->safeSQLParams($post);
    $query = 'INSERT INTO `latogatoi_csoportok` (
                `nev`
              ) VALUES (
                "' . $post['nev'] . '"
              )';

    echo $db->save($query);
?>