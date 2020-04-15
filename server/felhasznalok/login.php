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
    $query = 'SELECT *
              FROM `felhasznalok`
              WHERE `nev` = "' . $post['nev'] .'"
                AND `jelszo` = "' . md5($post['jelszo']) . '"';
    $result = $db->select($query, false);
    if (!isset($result['error'])) {
        $_SESSION['felhasznalo'] = $result['nev'];
    } else {
        unset($_SESSION['felhasznalo']);
    }
    echo $db->json($result);
?>