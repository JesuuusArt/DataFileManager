<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>
<body>
    <div class="container">
        
        <div class="left-panel">
            <h1>Bienvenido de nuevo</h1>
        </div>

        <div class="right-panel">
            <h2>Iniciar sesión</h2>
            <p>¿No tienes una cuenta? <a href="#">Crear cuenta</a></p>

            <form id="login-form" action="php/login.php" method="POST">
                <div class="input-group">
                    <i class="fas fa-envelope"></i>
                    <input type="text" required name="username" placeholder="Correo electrónico o Nombre de usuario">
                </div>

                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" required name="password" placeholder="Contraseña">
                </div>

                <div class="terms">
                    <input type="checkbox" id="remember">
                    <label for="remember">Recuérdame</label>
                </div>

                <br>

                <input type="submit" class="login-btn" value="Iniciar Sesion"></input>

                <div class="divider">
                    <span>O inicia sesión con</span>
                </div>

                <div class="social-login">
                    <button type="button" class="social-btn google-btn">
                        <img src="./assets/google.png" alt="Google" aria-label="Iniciar sesión con Google"> Google
                    </button>
                    <button type="button" class="social-btn apple-btn">
                        <img src="./assets/apple.png" alt="Apple" aria-label="Iniciar sesión con Apple"> Apple
                    </button>
                </div>

                <p class="help-text"><a href="#">¿Necesitas ayuda?</a></p>
            </form>

        </div>
    </div>
    
</body>
</html>
