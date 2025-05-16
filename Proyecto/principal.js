// Recupera los datos del sessionStorage AL CARGAR LA PÁGINA
const usuarioLogin = sessionStorage.getItem('Usuario'); // Mejor nombre de variable
const contraseñaLogin = sessionStorage.getItem('Contraseña'); // Mejor nombre de variable

if (usuarioLogin && contraseñaLogin) {
    document.getElementById("userData").textContent = `Usuario: ${usuarioLogin}`;
} else {
}

const usuarioGuardado = sessionStorage.getItem('usuario');
const contraseñaGuardado = sessionStorage.getItem('contraseña')

if (usuarioGuardado && contraseñaGuardado) {
    document.getElementById("userData2").textContent= `Usuario: ${usuarioGuardado}`
  } else {
    // Si no hay datos, redirige de vuelta al login
    //window.location.href = "";
}

    