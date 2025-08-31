import { obtenerUsuario } from "../services/servicios.js";

const usuario = document.getElementById("usuario_id");
const clave = document.getElementById("clave");
const mensajeError = document.getElementById("mensaje_error");

document.getElementById("form_login").addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = usuario.value.trim();
    const pass = clave.value.trim();

    const usuarioEncontrado = await obtenerUsuario(user, pass);

    if (usuarioEncontrado) {
        sessionStorage.setItem("usuario_id", usuarioEncontrado.id);
        sessionStorage.setItem("usuario_username", usuarioEncontrado.username);

        if (usuarioEncontrado.userT === "student") {
            mensajeError.style.display = "none";
            window.location.href = "../pages/main.html";
        } else if (usuarioEncontrado.userT === "admin") {
            mensajeError.style.display = "none";
            window.location.href = "../pages/adminpage.html";
        } else {
            // Si hay otros tipos, se pueden manejar aquí
            mensajeError.style.display = "block";
            mensajeError.textContent = "Tipo de usuario no reconocido.";
        }
    } else {
        mensajeError.style.display = "block";
        mensajeError.textContent = "Usuario o contraseña incorrectos.";
    }
});