<?php
class Database {
    public $con;

    function __construct() {
        global $mysqlconfig;

        $this->con = new mysqli($mysqlconfig['host'], $mysqlconfig['user'], $mysqlconfig['password'], $mysqlconfig['db_name']);
        if ($this->con->connect_error) {
            die('Connect Error (' . $this->con->connect_errno . ') '
                    . $this->con->connect_error);
        }
        $this->con->set_charset("utf8");
    }

    function __destruct() {
        $this->con->close();
    }

    function select($query) {
        global $mysqlconfig;
        if ($sqlresult = $this->con->query($query)) {
            $result = [];
            while ($row = $sqlresult->fetch_assoc()) {
                if ($row) {
                    $result[] = $row;
                }
            }
            $sqlresult->close();
        } else {
            $result = ['error' => [
                'query' => $query,
                'message' => $this->con->error,
            ]];    
        }
        return $this->json($result);
    }

    function save($query) {
        if ($this->con->query($query) === true) {
            $result = ['result' => 'ok'];
        } else {
            $result = ['error' => [
                'query' => $query,
                'message' => $this->con->error,
            ]];    
        }
        return $this->json($result);
    }

    function update($query){
        $this->save($query);
    }

    function delete($query){
        if ($this->con->query($query) === true) {
            $result = ['result' => 'ok'];
        } else {
            $result = ['error' => [
                'query' => $query,
                'message' => $this->con->error,
            ]];    
        }
        return $this->json($result);
    }

    

    function serch($query){
    }

    function json($data) {
        return json_encode($data);
    }

}

?>