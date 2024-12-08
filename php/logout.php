<?php

session_start(); // Inicia la sesión

// Destruir todas las variables de la sesión
session_unset();

// Destruir la sesión
session_destroy();

// Redirigir al index.php (ajusta la ruta si es necesario)
header('Location: ../index.php');
exit();


?>