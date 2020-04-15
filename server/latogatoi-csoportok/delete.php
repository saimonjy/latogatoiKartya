<?php 
    require(dirname(__DIR__) . '/includes/config.php');
    //a megjelenitett kartya sorszamat fogadom az view-tol. tolom a kartyat aminek a id == sorszammal.
    //1. $post atalakitasa olyan adatta ami a tablaban jo (ervenyesseg kezelese)
    if (!$_GET['id']) {
        $result = ['error' => [
            'message' => 'ervenytelen azonosito',
        ]];  
        die(json_encode($result));
    }
    $id = $_GET['id'];
    $db = new Database();

    $db->safeSQLParams($id);
    $query = 'DELETE FROM `latogatoi_csoportok` WHERE `id` = ' . $id;

    //2. $post eltarolasa az adatbazisban

    echo $db->delete($query);
?>