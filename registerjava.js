document.getElementById('formularioRegister').addEventListener('submit',
    function(eventos) { eventos.preventDefault();

        var usuario = document.getElementById('nombres_user').value;
        var contraseña = document.getElementById('password').value;

        if (usuario && contraseña) {
            
            sessionStorage.setItem('nombres_user', usuario);
            sessionStorage.setItem('password', contraseña)

            window.location.href= "Proyecto.html";
        } else {
            alert('tiene que completar los campos')
}})