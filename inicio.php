<?php

session_start();

if(!isset($_SESSION['username']) || $_SESSION['role_id'] != 2) {
    header("Location: index.php");
    exit();
}

require_once './php/connection.php';
$connection = new Connection();
$pdo = $connection->connect();

$sql = "SELECT id, username FROM usuarios";
$stmt = $pdo->query($sql);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Drive</title>
    <link rel="stylesheet" href="./css/inicio.css">
</head>
<body>
    <header>
        <div class="logo">📂 MiDrive</div>
        <nav>
            <a href="php/logout.php">Cerrar Sesión</a>
        </nav>
    </header>

    <div class="container">
        
        <div class="file-section">
            <h2>Agregar Nuevo Archivo</h2>
            <textarea id="new-file-content" placeholder="Escribe tu archivo aquí..."></textarea>
            <div class="add-buttons">
                <button class="action-btn add-start-btn">Agregar al Inicio</button>
                <button class="action-btn add-end-btn">Agregar al Final</button>
            </div>
        </div>

        <div class="file-list">
            <h2>Mi Drive</h2>
            <table id="file-table">
                <thead>
                    <tr>
                        <th>Nombre del Archivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>

    <div class="divider">
        <span>Operaciones Avanzadas</span>
    </div>

    <div class="advanced-operations">
        <button class="action-btn search-btn">Buscar Archivo</button>
        <button class="action-btn edit-btn">Editar Archivo</button>
        <button class="action-btn delete-start-btn">Eliminar al Inicio</button>
        <button class="action-btn delete-end-btn">Eliminar al Final</button>
        <button class="action-btn clear-all-btn">Limpiar Todo</button>
    </div>

    <footer>
        <div class="footer-content">
            <p>&copy; 2024 MiDrive. Todos los derechos reservados.</p>
            <p>Desarrollado por <a href="https://github.com/JesuuusArt">@JesuuusArt</a></p>
            <p><a href="https://www.instagram.com/jxsuusart/">Contacto</a> | <a href="#">Política de Privacidad</a></p>
        </div>
    </footer>

    <script src="./js/inicio.js"></script>

</body>
</html>
