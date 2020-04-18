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

        function list($query) {
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

        function select($query, $json = true) {
            global $mysqlconfig;
            if ($sqlresult = $this->con->query($query)) {
                $row = $sqlresult->fetch_assoc();
                if ($row) {
                    $result = $row;
                } else {
                    $result = ['error' => [
                        'query' => $query,
                        'message' => 'Nincs ilyen azonositoju sor az adatabzisban.' .$this->con->error ,
                    ]];    
                }
                $sqlresult->close();
            } else {
                $result = ['error' => [
                    'query' => $query,
                    'message' => $this->con->error,
                ]];    
            }
            return $json ? $this->json($result) : $result;
        }

        function save($query) {
            if ($this->con->query($query) === true) {
                $result = ['result' => 'ok'];
            } else {
                $result = ['error' => [
                    'query' => $query,
                    'message' => 'válasszon látogatói csoportot',
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

        function json($data) {
            return json_encode($data);
        }
        
        function safeSQLParams(&$params) {
            if (is_array($params)) {
                array_walk($params, function (&$value, $key) {
                    $value = $this->con->real_escape_string($value);
                });
            } else if (is_string($params)) {
                $params = $this->con->real_escape_string($params);
            }
        }
    }

?>