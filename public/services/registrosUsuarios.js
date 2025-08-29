async function crearNuevoUsuario(nuevoUsuario) {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoUsuario)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al crear nuevo usuario:", error);
    }
}

async function verificarUsuarioExistente(nombreUsuario) {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios");
        const usuarios = await respuesta.json();
        return usuarios.some(usuario => usuario.username === nombreUsuario);
    } catch (error) {
        console.error("Error al verificar usuario existente:", error);
        return false;
    }
}

async function obtenerUsuarioPorNombreYTipo(username, tipoUsuario) {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios");
        const usuarios = await respuesta.json();
        return usuarios.find(usuario =>
            usuario.username === username && usuario.userT === tipoUsuario
        );
    } catch (error) {
        console.error("Error al obtener usuario por nombre y tipo:", error);
    }
}

export {
    crearNuevoUsuario,
    verificarUsuarioExistente,
    obtenerUsuarioPorNombreYTipo
};