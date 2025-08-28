import { obtenerUsuario } from "../services/servicios.js";

let usuario = document.getElementById("usuario_id");
let clave = document.getElementById("clave");
let btnLogin = document.getElementById("btnIngreso");
let mensajeError = document.getElementById("mensaje_error");

document.getElementById("form_login").addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = usuario.value.trim();
    const pass = clave.value.trim();

    /* Obtenemos al usuario con tipo "normal" */
    const usuarioEncontrado = await obtenerUsuario(user, pass, "student");

    if (usuarioEncontrado) {
        sessionStorage.setItem("usuario_id", usuarioEncontrado.id);

        /* Validamos que el tipo sea el correcto */
        if (usuarioEncontrado.userT === "student") {
            mensajeError.style.display = "none";
            window.location.href = "../pages/main.html";
        } else {
            
        }
    } else {
        mensajeError.style.display = "block";
    }
});