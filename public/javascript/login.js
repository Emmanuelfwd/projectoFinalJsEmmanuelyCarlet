import { obtenerUsuario } from "../services/servicios.js";

let usuario = document.getElementById("usuario_id");
let clave = document.getElementById("clave");
let btnLogin = document.getElementById("btnIngreso");
let mensajeError = document.getElementById("mensaje_error");

document.getElementById("form_login").addEventListener("submit", async () => {
    
    const user = usuario.value.trim();
    const pass = clave.value.trim();
    const usuarioEncontrado = await obtenerUsuario(user, pass);

    if (usuarioEncontrado) {
             
        localStorage.setItem("usuario_logueado", JSON.stringify(usuarioEncontrado));

        
        if (usuarioEncontrado.userT === "normal") {
            mensajeError.style.display = "none";
            window.location.href = "../pages/main.html"; 
        } else {
            alert("Acceso denegado: solo usuarios normales pueden ingresar.");
            localStorage.removeItem("usuario_logueado"); 
        }
        
    } else {
        
        mensajeError.style.display = "block";
    }
});
