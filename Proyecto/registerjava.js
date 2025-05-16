document.getElementById('formularioRegister').addEventListener('submit',
    function(eventos) { eventos.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const contraseña = document.getElementById('contraseña').value;

        if (usuario && contraseña) {
            
            sessionStorage.setItem('usuario', usuario);
            sessionStorage.setItem('contraseña', contraseña)

            window.location.href= "/";
        } else {
            alert('tiene que completar los campos')
        }

        
    }
)