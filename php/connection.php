<?php
class Connection {
    public $host = 'localhost'; 
    public $dbname = 'mydrive'; 
    public $username = 'root'; 
    public $password = '1234'; 

    public function connect() {
        try {
            // Sin espacios extra en el DSN
            $dsn = "mysql:host={$this->host};dbname={$this->dbname}";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false, 
            ];
            return new PDO($dsn, $this->username, $this->password, $options);

        } catch (\Throwable $th) {
            echo "Error en la conexión: " . $th->getMessage();
            exit;
        }
    }
}
?>
