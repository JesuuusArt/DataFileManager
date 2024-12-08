<?php
require_once '../php/connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    var_dump($_POST); // Ver los datos que llegan del formulario

    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        $connection = new Connection();
        $pdo = $connection->connect();

        $sql = "SELECT * FROM usuarios WHERE username = :username";
        $stsm = $pdo->prepare($sql);
        $stsm->execute(['username' => $username]);
        $user = $stsm->fetch(PDO::FETCH_ASSOC);

        if ($user && hash('sha256', $password) === $user['password']) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role_id'] = $user['role_id'];
        
            if ($user['role_id'] == "1") {
                header('Location: ../admin.php');
                exit();
            } else if ($user['role_id'] == "2") {
                header('Location: ../inicio.php');
                exit();
            } else {
                echo "Acceso Denegado";
                exit();
            }
        } else {
            $error_message = "Credenciales Incorrectas";
            echo $error_message;
        } 

    } catch (\Throwable $th) {
        echo "Error al Iniciar Sesión: " . $th->getMessage();
        exit;
    }
}
?>
