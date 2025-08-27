import { obtenerUsuario } from "../services/servicios.js";

let usuario = document.getElementById("usuario_id");
let clave = document.getElementById("clave");
let btnLogin = document.getElementById("btnIngreso");
let mensajeError = document.getElementById("mensaje_error");

document.getElementById("form_login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = usuario.value.trim();
    const pass = clave.value.trim();
    const usuarioEncontrado = await obtenerUsuario(user, pass);

    if (usuarioEncontrado) {
        mensajeError.style.display = "none";
        window.location.href = "../pages/main.html";
    } else {
        
        mensajeError.style.display = "block";
    }
});
