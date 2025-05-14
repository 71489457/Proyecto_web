// Recupera los datos del sessionStorage AL CARGAR LA PÁGINA
var usuarioLogin = sessionStorage.getItem('nombres_user'); // Mejor nombre de variable
var contraseñaLogin = sessionStorage.getItem('password'); // Mejor nombre de variable

if (usuarioLogin && contraseñaLogin) {
    document.getElementById("userData").textContent = `Usuario: ${usuarioLogin}`;
}

    