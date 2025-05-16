// Validación de formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const numTarjeta = document.getElementById('num_tar');
    const fechaVen = document.getElementById('fecha_ven');
    const cvv = document.getElementById('cvv');
    const titular = document.getElementById('titular');
    const dni = document.getElementById('dni');
    const email = document.getElementById('email');
    
    // Añadir los logos de tarjetas al HTML
    const addCardLogos = () => {
        const logoDiv = document.createElement('div');
        logoDiv.className = 'card-logos';
        logoDiv.innerHTML = `
            <img src="https://1000marcas.net/wp-content/uploads/2019/12/VISA-Logo.png" alt="Visa" class="card-logo visa-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" class="card-logo mastercard-logo">
        `;
        
        // Insertar después del título
        const h2 = document.querySelector('.form-container h2');
        h2.parentNode.insertBefore(logoDiv, h2.nextSibling);
    };
    
    // Añadir los logos al cargar la página
    addCardLogos();
    
    // Función para formatear el número de la tarjeta mientras se escribe
    numTarjeta.addEventListener('input', function(e) {
        // Eliminar todos los espacios para trabajar solo con números
        let cardNumber = this.value.replace(/\s/g, '');
        
        // Eliminar cualquier caracter que no sea número
        cardNumber = cardNumber.replace(/\D/g, '');
        
        // Añadir espacios cada 4 dígitos
        let formattedCard = '';
        for (let i = 0; i < cardNumber.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedCard += ' ';
            }
            formattedCard += cardNumber[i];
        }
        
        // Actualizar valor del campo
        this.value = formattedCard;
        
        // Mostrar icono de Visa o Mastercard según el número
        detectCardType(cardNumber);
    });
    
    function detectCardType(number) {
        const firstDigit = number.charAt(0);
        const firstTwoDigits = number.substr(0, 2);
        
        if (firstDigit === '4') {
            // Visa comienza con 4
            showCardLogo('visa');
        } else if (firstTwoDigits >= '51' && firstTwoDigits <= '55' || firstDigit === '2') {
            // Mastercard comienza con 51-55
            showCardLogo('mastercard');
        } else {
            hideCardLogos();
        }
    }
    
    function showCardLogo(type) {
        hideCardLogos();
        if (document.querySelector(`.${type}-logo`)) {
            document.querySelector(`.${type}-logo`).style.opacity = '1';
        }
    }
    
    function hideCardLogos() {
        document.querySelectorAll('.card-logo').forEach(logo => {
            logo.style.opacity = '0.3';
        });
    }
    
    // Validar CVV (solo números)
    cvv.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });
    
    // Validar DNI (solo números)
    dni.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });
    
    // Función de validación de correo electrónico
    function validateEmailInput() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailFeedback = document.getElementById('emailFeedback');
        
        if (!emailRegex.test(email.value) && email.value.length > 0) {
            emailFeedback.textContent = 'Por favor ingrese un email válido';
            email.classList.add('error');
            return false;
        } else {
            emailFeedback.textContent = '';
            email.classList.remove('error');
            return true;
        }
    }
    
    // Asignar la función al evento oninput del campo de email
    email.oninput = validateEmailInput;
    
    // Validación del titular (solo letras y espacios)
    titular.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    });
    
    // Envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validaciones
        let isValid = true;
        
        // Validar número de tarjeta (debe tener 16 dígitos)
        const cardDigits = numTarjeta.value.replace(/\s/g, '');
        if (cardDigits.length !== 16) {
            showError(numTarjeta, 'Debe ingresar 16 dígitos');
            isValid = false;
        } else {
            clearError(numTarjeta);
        }
        
        // Validar fecha (debe ser futura)
        const currentDate = new Date();
        const selectedDate = new Date(fechaVen.value);
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth();
        
        if (selectedYear < currentYear || (selectedYear === currentYear && selectedMonth <= currentMonth)) {
            showError(fechaVen, 'La fecha debe ser futura');
            isValid = false;
        } else {
            clearError(fechaVen);
        }
        
        // Validar CVV (debe tener 3 dígitos)
        if (cvv.value.length !== 3) {
            showError(cvv, 'El CVV debe tener 3 dígitos');
            isValid = false;
        } else {
            clearError(cvv);
        }
        
        // Validar nombre del titular (no vacío)
        if (titular.value.trim() === '') {
            showError(titular, 'Ingrese el nombre del titular');
            isValid = false;
        } else {
            clearError(titular);
        }
        
        // Validar DNI (debe tener 8 dígitos)
        if (dni.value.length !== 8) {
            showError(dni, 'El DNI debe tener 8 dígitos');
            isValid = false;
        } else {
            clearError(dni);
        }
        
        // Validar email
        if (!validateEmailInput()) {
            isValid = false;
        }
        
        // Si todo es válido, mostrar primero el mensaje de procesamiento
        if (isValid) {
            showProcessingMessage();
            
            // Simular tiempo de procesamiento (3 segundos) antes de mostrar éxito
            setTimeout(() => {
                hideProcessingMessage();
                showSuccessMessage();
            }, 3000);
        }
    });
    
    function showProcessingMessage() {
        // Crear estructura del mensaje de procesamiento
        const processingDiv = document.createElement('div');
        processingDiv.className = 'success-message processing-message';
        processingDiv.id = 'processingMessage';
        
        processingDiv.innerHTML = `
            <div class="success-message-content processing-content">
                <div class="loading-spinner">
                    <div class="spinner"></div>
                </div>
                <h3>Procesando tu pago...</h3>
                <p>Por favor espere mientras completamos la transacción.</p>
            </div>
        `;
        
        document.body.appendChild(processingDiv);
        
        // Mostrar el mensaje
        setTimeout(() => {
            processingDiv.style.display = 'flex';
        }, 100);
    }
    
    function hideProcessingMessage() {
        const processingDiv = document.getElementById('processingMessage');
        if (processingDiv) {
            processingDiv.style.display = 'none';
            processingDiv.remove();
        }
    }
    
    function showError(input, message) {
        input.classList.add('error');
        
        // Buscar si ya existe un mensaje de error
        let errorSpan = input.parentElement.querySelector('.error-message');
        
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            input.parentElement.appendChild(errorSpan);
        }
        
        errorSpan.textContent = message;
    }
    
    function clearError(input) {
        input.classList.remove('error');
        const errorSpan = input.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }
    
    function showSuccessMessage() {
        // Crear estructura del mensaje
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        
        successDiv.innerHTML = `
            <div class="success-message-content">
                <div class="success-check">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                </div>
                <h3>¡Transacción Completada!</h3>
                <p>Su pago ha sido procesado correctamente.</p>
                <button id="success-close">Aceptar</button>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Mostrar el mensaje
        setTimeout(() => {
            successDiv.style.display = 'flex';
        }, 100);
        
        // Configurar botón para cerrar el mensaje
        document.getElementById('success-close').addEventListener('click', function() {
            successDiv.style.display = 'none';
            // Opcional: redireccionar o reiniciar el formulario
            form.reset();
            //Agregar un pequeño retraso de redireccionar 
            setTimeout(() => {
                successDiv.remove();
                //Redireccionar a Proyecto.html
                window.location.href = "Proyecto.html";
            }, 300);
        });
    }
});

// Función global para validar email
function validateEmailInput() {
    const email = document.getElementById('email');
    const emailFeedback = document.getElementById('emailFeedback');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email.value) && email.value.length > 0) {
        emailFeedback.textContent = 'Por favor ingrese un email válido';
        email.classList.add('error');
        return false;
    } else {
        emailFeedback.textContent = '';
        email.classList.remove('error');
        return true;
    }
}