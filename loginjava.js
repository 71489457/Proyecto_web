document.getElementById('login').addEventListener('submit',
    function(eventos) {
        eventos.preventDefault();

        const usuarioIngresado = document.getElementById('Usuario').value; // Mejor nombre de variable
        const contraseñaIngresada = document.getElementById('Contraseña').value; // Mejor nombre de variable

        //validacion de datos
        if (usuarioIngresado && contraseñaIngresada) {
            //guardado de datos
            sessionStorage.setItem('Usuario', usuarioIngresado);
            sessionStorage.setItem('Contraseña', contraseñaIngresada);

            window.location.href = "Proyecto.html";
        } else {
            alert("completa los campos");
        }
    }
);
