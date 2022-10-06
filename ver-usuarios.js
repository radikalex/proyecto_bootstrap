const users = JSON.parse(localStorage.getItem("users"));
const div_usuarios = document.querySelector('.contenedor-usuarios');

for(let i = 0; i < users.length; i++) {

    console.log("Entra");
    const div_card = document.createElement('div');
    div_card.className = "card"
    div_card.innerHTML = 
    `       <div class="card-header">
                Usuario ${i}
            </div>
            <img src="no-image.png">
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><b>Nombre:</b> ${users[i].nombre}</li>
              <li class="list-group-item"><b>Correo:</b> ${users[i].email}</li>
            </ul>`;

    div_usuarios.appendChild(div_card);
}
