//COMANDO PARA EL CARRITO DE COMPRAS

var contador = 0;
var contadorElemento = document.getElementById("contador");
var botones = document.querySelectorAll(".btn-carrito");

// Esta función se ejecuta cuando se hace clic en un botón
function agregarAlCarrito(event) {
    contador++;
    contadorElemento.textContent = contador;

    var boton = event.target;
    var producto = {
        id: boton.getAttribute("data-id"),
        nombre: boton.getAttribute("data-nombre"),
        precio: boton.getAttribute("data-precio"),
        imagen: boton.getAttribute("data-imagen")
    };

    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Enganchar los botones al evento click una sola vez
botones.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
});

// Mostrar productos en Carrito_compras.html
if (window.location.pathname.includes("Carrito_compras.html")) {
    document.addEventListener("DOMContentLoaded", function () {
        var main = document.querySelector("main");
        var carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        if (carrito.length === 0) {
            main.innerHTML += "<p>Tu carrito está vacío.</p>";
        } else {
            // Mostrar el botón Comprar
            var contenedorBoton = document.getElementById("botonComprarContenedor");
            if (contenedorBoton) {
                contenedorBoton.style.display = "block";
            }

            var lista = document.createElement("ul");
            lista.style.listStyle = "none";
            lista.style.padding = "0";

            carrito.forEach((producto, index) => {
                producto.cantidad = producto.cantidad || 1;

                var item = document.createElement("li");
                item.style.marginBottom = "20px";
                item.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="100"><br>
                    <strong>${producto.nombre}</strong><br>
                    Precio: s/${producto.precio}<br>
                    Cantidad: 
                    <button class="btn-restar" data-index="${index}">–</button>
                    <span id="cantidad-${index}">${producto.cantidad}</span>
                    <button class="btn-sumar" data-index="${index}">+</button><br>
                    Subtotal: s/<span id="subtotal-${index}">${(producto.precio * producto.cantidad).toFixed(2)}</span><br>
                    <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                `;
                lista.appendChild(item);
            });

            main.appendChild(lista);

            // Función para actualizar el subtotal y cantidad en pantalla
            function actualizarVista(index) {
                const cantidadSpan = document.getElementById(`cantidad-${index}`);
                const subtotalSpan = document.getElementById(`subtotal-${index}`);
                const producto = carrito[index];
                cantidadSpan.textContent = producto.cantidad;
                subtotalSpan.textContent = (producto.precio * producto.cantidad).toFixed(2);
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }

            // Escuchar botones sumar/restar/eliminar
            main.addEventListener("click", function (e) {
                const index = e.target.getAttribute("data-index");
                if (e.target.classList.contains("btn-sumar")) {
                    carrito[index].cantidad++;
                    actualizarVista(index);
                } else if (e.target.classList.contains("btn-restar")) {
                    if (carrito[index].cantidad > 1) {
                        carrito[index].cantidad--;
                        actualizarVista(index);
                    }
                } else if (e.target.classList.contains("btn-eliminar")) {
                    carrito.splice(index, 1);
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    location.reload();
                }
            });

            // Evento del botón Comprar
            const btnComprar = document.getElementById("btnComprar");
            if (btnComprar) {
                btnComprar.addEventListener("click", function () {
                    window.location.href = "formulario.html";
                });
            }
        }
    });
}

