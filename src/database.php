<?php
class Database {
    private $host = "localhost";  
    private $db   = "travelPlanner"; 
    private $user = "SA";          
    private $pass = "RosyP@ssw0rd!";
    private $conn;

   public function connect() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "sqlsrv:Server=" . $this->host . ";Database=" . $this->db,
                $this->user,
                $this->pass
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected successfully"; 
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
        return $this->conn;
    }
}

// $db = new Database();
// $db->connect();
?>
