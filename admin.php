<?php
session_start();

// Verificar si la sesión está activa y si el usuario está autenticado
if (!isset($_SESSION['username'])) {
    // Redirigir al index.php si no está autenticado
    header('Location: index.php');
    exit();
}

// Verificar si el usuario tiene el rol adecuado para acceder a la página (si es necesario)
if ($_SESSION['role_id'] !== 1) {
    // Si no es administrador, mostrar mensaje de acceso denegado
    echo "Acceso denegado. Solo los Administradores pueden acceder a esta página.";
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MiDrive - Admin</title>
    <link rel="stylesheet" href="./css/admin.css">
</head>
<body>
    <header>
        <div class="logo">📂 MiDrive - Admin</div>
        <nav>
            <a href="php/logout.php">Cerrar Sesión</a>
        </nav>
    </header>

    <div class="container">

        <div class="user-section">
            <h2>Gestión de Usuarios</h2>

            <div class="user-list">
                <table id="user-table">
                    <thead>
                        <tr>
                            <th>Nombre de Usuario</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
            </div>

            <div class="user-operations">
                <button class="action-btn search-user-btn">Buscar Usuario</button>
                <button class="action-btn delete-start-user-btn">Eliminar Usuario al Inicio</button>
                <button class="action-btn delete-end-user-btn">Eliminar Usuario al Final</button>
                <button class="action-btn clear-all-users-btn">Limpiar Todos los Usuarios</button>
            </div>
        </div>

    </div>

    <footer>
        <div class="footer-content">
            <p>&copy; 2024 MiDrive. Todos los derechos reservados.</p>
            <p>Desarrollado por <a href="https://github.com/JesuuusArt">@JesuuusArt</a></p>
        </div>
    </footer>

</body>
</html>
