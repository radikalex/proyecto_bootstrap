let users = JSON.parse(localStorage.getItem("users"));
const div_usuarios = document.querySelector('.contenedor-usuarios');

function actualizarDivUsuarios() {

  // Vaciar div usuarios 
  while (div_usuarios.firstChild) {
    div_usuarios.removeChild(div_usuarios.firstChild);
  }

  // Obtener datos del localStorage
  users = JSON.parse(localStorage.getItem("users"));
  console.log(users)

  if(users) {
    // Rellenar div con los datos del local Storage
    for(let i = 0; i < users.length; i++) {
        const div_card = document.createElement('div');
        div_card.className = "card"
        div_card.innerHTML = 
        `       <div class="card-header">
                    Usuario ${i + 1}
                </div>
                <img class="img-card" src="${users[i].link_img}">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><div><b>Nombre:</b></div> <div>${users[i].nombre}</div></li>
                  <li class="list-group-item"><div><b>Correo:</b></div> <div>${users[i].email}</div></li>
                </ul>
                <div class="contenedor-eliminar">
                  <button class="btn btn-primary boton-eliminar" onclick="eliminarUsuario(event, this)" id="boton_${i}">
                    Eliminar usuario
                  </button>
                </div>`;
    
        div_usuarios.appendChild(div_card);
    }
  }
  else {
    const h3 = document.createElement('h3')
    h3.innerHTML = 'Todavía no hay usuarios';
    h3.className = "sin-usuarios"
    div_usuarios.appendChild(h3);
  }
}

function eliminarUsuario(e, boton)  {
  e.preventDefault();
  const index = boton.id[boton.id.length - 1]
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users)); // Modificar el localStorage
  actualizarDivUsuarios();
}

actualizarDivUsuarios(); // Primera llamada para rellenar el div nada más entrar