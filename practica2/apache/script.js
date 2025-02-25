const apiUrl = "http://localhost:8080/api/usuarios";

document.getElementById("formRegistro").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email })
    });

    if (response.ok) {
        cargarUsuarios();
        document.getElementById("formRegistro").reset();
    } else {
        console.error("Error al registrar usuario");
    }
});

async function cargarUsuarios() {
    const response = await fetch(apiUrl);
    const usuarios = await response.json();

    const listaUsuarios = document.getElementById("listaUsuarios");
    listaUsuarios.innerHTML = "";

    usuarios.forEach(usuario => {
        const li = document.createElement("li");
        li.textContent = `${usuario.nombre} - ${usuario.email}`;
        listaUsuarios.appendChild(li);
    });
}

cargarUsuarios();
