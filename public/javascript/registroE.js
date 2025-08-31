document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form_registro");

  // Crear div para mostrar errores (o mensajes)
  const divError = document.createElement("div");
  divError.style.color = "red";
  divError.style.marginBottom = "15px";

 

  formulario.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Obtener valores con getElementById (más seguro que por índice)
    const nombreUsuario = document.getElementById("nombre_usuario").value.trim();
    const contrasenia = document.getElementById("contrasenia").value;
    const confirmar = document.getElementById("confirmar_contrasenia").value;
    const aceptaTerminos = document.getElementById("acepta_terminos").checked;

    // Limpiar mensaje previo
    divError.textContent = "";
    divError.style.color = "red";

    // Validaciones
    if (nombreUsuario === "" || contrasenia === "" || confirmar === "") {
      divError.textContent = "Todos los campos son obligatorios";
      return;
    }

    if (contrasenia !== confirmar) {
      divError.textContent = "Las contraseñas no coinciden";
      return;
    }

    if (!aceptaTerminos) {
      divError.textContent = "Debe aceptar los términos y condiciones";
      return;
    }

    // Aquí pondrías tu lógica para verificar usuario y crear usuario,
    // usando las funciones de tus servicios (ejemplo):

    try {
      // Ejemplo: verificar si usuario existe (usa tu función real)
      const yaExiste = await obtenerUsuarioPorNombreYTipo(nombreUsuario, "student");
      if (yaExiste) {
        divError.textContent = "Ese nombre de usuario ya está registrado";
        return;
      }

      const nuevoUsuario = {
        username: nombreUsuario,
        password: contrasenia,
        userT: "student",
      };

      await crearNuevoUsuario(nuevoUsuario);

      divError.style.color = "green";
      divError.textContent = "Usuario registrado con éxito";
      formulario.reset();

      setTimeout(() => {
        divError.textContent = "";
        divError.style.color = "red";
      }, 2000);
    } catch (error) {
      divError.textContent = "Ocurrió un error al registrar el usuario";
    }
  });
});