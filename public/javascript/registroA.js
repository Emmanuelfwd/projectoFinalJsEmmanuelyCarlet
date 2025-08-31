import {
    crearNuevoUsuario,
    verificarUsuarioExistente,
    obtenerUsuarioPorNombreYTipo
} from "../services/registrosUsuarios.js"

/* agarramos el formulario */
const formulario = document.getElementById("form_registro")

/* creamos un div para mostrar errores */
const divError = document.createElement("div")
divError.style.color = "red"
divError.style.marginBottom = "15px"
formulario.insertBefore(divError, formulario.firstChild)

formulario.addEventListener("submit", async function(e) {
    e.preventDefault() /* evitamos que se recargue la pagina */

    /* inputs del formulario */
    const inputs = formulario.getElementsByTagName("input")
    const nombreAdmin = inputs[0].value.trim()       // <--- Cambiado aquí
    const contrasenia = inputs[1].value
    const confirmar = inputs[2].value
    const aceptaTerminos = inputs[3].checked

    /* limpiamos mensaje anterior */
    divError.textContent = ""

    /* validar campos vacios */
    if (nombreAdmin === "" || contrasenia === "" || confirmar === "") {
        divError.textContent = "Todos los campos son obligatorios"
        return
    }

    /* validar que las contraseñas coincidan */
    if (contrasenia !== confirmar) {
        divError.textContent = "Las contraseñas no coinciden"
        return
    }

    /* validar que se acepten los terminos */
    if (!aceptaTerminos) {
        divError.textContent = "Debe aceptar los términos y condiciones"
        return
    }

    /* revisar si ya existe un usuario con ese nombre y tipo "admin" */
    const yaExiste = await obtenerUsuarioPorNombreYTipo(nombreAdmin, "admin")  // <-- cambia "student" a "admin"
    if (yaExiste) {
        divError.textContent = "Ese nombre de usuario ya está registrado"
        return
    }

    /* se crea el usuario */
    const nuevoUsuario = {
        username: nombreAdmin,
        password: contrasenia,
        userT: "admin"   // <--- Aquí aseguramos que sea admin
    }

    try {
        await crearNuevoUsuario(nuevoUsuario)

        divError.style.color = "green"
        divError.textContent = "Usuario registrado con éxito"

        /* metodo para resetar formulario */
        formulario.reset()

        /* mensaje desaparece en 2 seg */
        setTimeout(() => {
            divError.textContent = ""
            divError.style.color = "red"
        }, 2000)

    } catch (error) {
        divError.textContent = "Ocurrió un error al registrar el usuario"
    }
})