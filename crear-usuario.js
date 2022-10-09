
/* ------- Variables globales -------*/

const sendButton = document.getElementById('subButton');
const div_alertas = document.querySelector('.alertas');
const div_exito = document.querySelector('.alerta-exito');

const my_form = document.getElementById('my-form');
const input_nombre = document.getElementById("name");
const input_email = document.getElementById('email');
const input_pass1 = document.getElementById('password1');
const input_pass2 = document.getElementById('password2');
const input_link_img = document.getElementById('link_img');

const users = JSON.parse(localStorage.getItem("users"));
const myArray = users || [];

/* ----------- Funciones -----------*/

function eliminarValidacionVisual() {
    input_nombre.className="col form-control";
    input_email.className="col form-control";
    input_pass1.className="col form-control";
    input_pass2.className="col form-control";
}
// Listeners
input_nombre.addEventListener('keyup', eliminarValidacionVisual);
input_email.addEventListener('keyup', eliminarValidacionVisual);
input_pass1.addEventListener('keyup', eliminarValidacionVisual);
input_pass2.addEventListener('keyup', eliminarValidacionVisual);

function invalidarInputs(bool_nombre, bool_email, bool_pass1, bool_pass2) {
    if(bool_nombre) input_nombre.classList.add("is-invalid");
    if(bool_email)  input_email.classList.add("is-invalid");
    if(bool_pass1)  input_pass1.classList.add("is-invalid");
    if(bool_pass2)  input_pass2.classList.add("is-invalid");
}

function onSubmit(e) {
    e.preventDefault();
    const nombre = input_nombre.value;
    const email = input_email.value;
    const pass1 = input_pass1.value;
    const pass2 = input_pass2.value;
    let link_img = input_link_img.value;

    if (! validacionesCorrectas(nombre, email, pass1, pass2)) return;

    // Comprobar input adicional de link image
    if(link_img.trim() === "" ) link_img = "./assets/images/no-image.png"; 

    const person = {
        nombre, // ES6 --> Esto es lo mismo que poner nombre: nombre
        email,
        pass1,
        pass2,
        link_img
    }
    myArray.push(person);
    localStorage.setItem("users", JSON.stringify(myArray));

    // Deshabilitar el botón para evitar la posibilidad de crear varios usuarios
    sendButton.disabled = "true";

    // Mostrar mensaje de usuario creado correctamente
    // Crear alerta
    const pop_alert = document.createElement('div');
    pop_alert.className = "alert alert-success mt-3";
    pop_alert.role = "alert";
    pop_alert.innerHTML = "Usuario creado correctamente";
    div_exito.appendChild(pop_alert);
    
    // Borrar alerta tras 3 segundos
    setTimeout(() => {
        location.href = "ver-usuarios.html"
    }, 3000);

}

function validacionesCorrectas(nombre, email, pass1, pass2) {

    if(nombre === "" || email === "" || pass1 === "" || pass2 === "") {
        invalidarInputs(nombre === "", email === "", pass1 === "", pass2 === "");
        crearAlertaValidacion("Es obligatorio rellenar todos los campos obligatorios", 3000);
        return false;
    }
    if( ! /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gm.test(email) ) {
        invalidarInputs(false, true, false, false);
        crearAlertaValidacion("El formato del email no es válido", 3000);
        return false;
    }
    if( ! /^\w{4,12}$/gm.test(pass1) ) {
        invalidarInputs(false, false, true, false);
        crearAlertaValidacion("La contraseña debe tener de 4 a 12 carácteres y no puede contener carácteres especiales", 5000);
        return false;
    }
    if(pass1 !== pass2) {
        invalidarInputs(false, false, true, true);
        crearAlertaValidacion("Las contraseñas no coinciden", 3000);
        return false;
    }

    return true;
}

function crearAlertaValidacion(mensaje, tiempo) {

    // Vaciar div alertas
    while (div_alertas.firstChild) {
        div_alertas.removeChild(div_alertas.firstChild);
    }

    // Crear alerta
    const pop_alert = document.createElement('div');
    pop_alert.className = "alert alert-danger";
    pop_alert.role = "alert";
    pop_alert.innerHTML = mensaje;
    div_alertas.appendChild(pop_alert);
    
    // Borrar alerta tras 3 segundos
    setTimeout(() => pop_alert.remove(), tiempo);
}


