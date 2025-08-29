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
    const nombreUsuario = inputs[0].value.trim()
    const contrasenia = inputs[1].value
    const confirmar = inputs[2].value
    const aceptaTerminos = inputs[3].checked

    /* limpiamos mensaje anterior */
    divError.textContent = ""

    /* validar campos vacios */
    if (nombreUsuario === "" || contrasenia === "" || confirmar === "") {
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
        userT: "student"
    }

    try {
        await crearNuevoUsuario(nuevoUsuario)

      
        divError.style.color = "green"
        divError.textContent = "Usuario registrado con éxito"

        /* metodo para resetar forumlario en vez de poner las casillas en "" */
        formulario.reset()


        /* mensaje de error con metodo timeout */

        setTimeout(() => {
            divError.textContent = ""
            divError.style.color = "red"
        }, 2000)

    } catch (error) {
        divError.textContent = "Ocurrió un error al registrar el usuario"
    }
})
