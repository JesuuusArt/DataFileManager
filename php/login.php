<?php
session_start();
require 'conexion.php'; // Conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validar entrada
    if (empty($email) || empty($password)) {
        die("Por favor, completa todos los campos.");
    }

    // Consulta para buscar al usuario
    $stmt = $conn->prepare("SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Verificar la contraseña
        if (password_verify($password, $user['password'])) {
            $_SESSION['id'] = $user['id'];
            $_SESSION['nombre'] = $user['nombre'];
            $_SESSION['rol'] = $user['rol'];

            // Redirigir según el rol
            if ($user['rol'] === 'admin') {
                header("Location: admin.html");
            } else {
                header("Location: inicio.html");
            }
            exit();
        } else {
            die("Contraseña incorrecta.");
        }
    } else {
        die("Usuario no encontrado.");
    }
}
?>
