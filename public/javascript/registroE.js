import {
    crearNuevoUsuario,
    obtenerUsuarioPorNombreYTipo
} from "../services/registrosUsuarios.js"

/* agarramos el formulario */
const formulario = document.getElementById("form_registro")

/* creamos un div para mostrar errores o mensajes */
const divError = document.createElement("div")
divError.style.color = "red"
divError.style.marginBottom = "15px"
formulario.insertBefore(divError, formulario.firstChild)

formulario.addEventListener("submit", async function(e) {
    e.preventDefault() /* evitamos que se recargue la página */

    /* inputs del formulario usando getElementById para mayor claridad */
    const nombreUsuario = document.getElementById("nombre_usuario").value.trim()
    const contrasenia = document.getElementById("contrasenia").value
    const confirmar = document.getElementById("confirmar_contrasenia").value
    const aceptaTerminos = document.getElementById("acepta_terminos").checked

    /* limpiamos mensaje anterior */
    divError.textContent = ""
    divError.style.color = "red"

    /* validar campos vacíos */
    if (nombreUsuario === "" || contrasenia === "" || confirmar === "") {
        divError.textContent = "Todos los campos son obligatorios"
        return
    }

    /* validar que las contraseñas coincidan */
    if (contrasenia !== confirmar) {
        divError.textContent = "Las contraseñas no coinciden"
        return
    }

    /* validar que se acepten los términos */
    if (!aceptaTerminos) {
        divError.textContent = "Debe aceptar los términos y condiciones"
        return
    }

    /* revisar si ya existe un usuario con ese nombre y tipo "student" */
    const yaExiste = await obtenerUsuarioPorNombreYTipo(nombreUsuario, "student")
    if (yaExiste) {
        divError.textContent = "Ese nombre de usuario ya está registrado"
        return
    }

    /* se crea el usuario */
    const nuevoUsuario = {
        username: nombreUsuario,
        password: contrasenia,
        userT: "student"   // aseguramos que sea estudiante
    }

    try {
        await crearNuevoUsuario(nuevoUsuario)

        divError.style.color = "green"
        divError.textContent = "Usuario registrado con éxito"

        /* resetear formulario */
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
