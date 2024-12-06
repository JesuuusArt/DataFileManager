<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header('Location: index.html');
    exit();
}

// Verificar roles
if ($_SESSION['usuario']['rol'] !== 'admin' && basename($_SERVER['PHP_SELF']) === 'admin.html') {
    header('Location: inicio.html');
    exit();
}
?>
