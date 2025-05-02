const cardNumberInput = document.getElementById('num_tar');
const cvvInput = document.getElementById('cvv');
const dniInput = document.getElementById('dni');

  cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Eliminar no dígitos
    let formattedValue = '';

    // Limitar a 16 dígitos
    value = value.substring(0, 65);

    // Insertar espacios cada 4 dígitos
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }

    // Actualizar el valor del input
    e.target.value = formattedValue;
  });

  cvvInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); 

    // Actualizar el valor del input
    e.target.value = value;
    });


    dniInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); 

    // Actualizar el valor del input
    e.target.value = value;
    });

    function validateEmailInput() {
        const emailInput = document.getElementById('email').value;
        const feedbackElement = document.getElementById('emailFeedback');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        if (emailRegex.test(emailInput)) {
          feedbackElement.textContent = ""; // Email es valido
        } else {
          feedbackElement.textContent = "Por favor ingrese un email válido.";
        }
      }