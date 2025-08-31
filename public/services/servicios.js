export async function obtenerUsuario(userName, password,userT) {
  try {
    const respuesta = await fetch("http://localhost:3001/usuarios");
    const usuarios = await respuesta.json();

    return usuarios.find(usuario =>
      usuario.username === userName && usuario.password === password
    );

    
  } catch (error) {
    console.error("Error al obtener usuario:", error);
  }
}

export async function obtenerSolicitudes() {
    try {
        const resp = await fetch("http://localhost:3001/Solicitud");
        return await resp.json();
    } catch (error) {
        console.error("Error al obtener solicitudes:", error);
        return [];
    }
}

export async function crearSolicitud(solicitud) {
    try {
        const resp = await fetch("http://localhost:3001/Solicitud", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(solicitud)
        });
        return await resp.json();
    } catch (error) {
        console.error("Error al crear solicitud:", err);
    }
}
export async function actualizarSolicitud(id, cambios) {
    try {
        const resp = await fetch(`http://localhost:3001/Solicitud/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cambios)
        });
        return await resp.json();
    } catch (error) {
        console.error("Error al actualizar solicitud:", error);
    }
}

export async function obtenerUsuarioPorId(id) {
    try {
        const resp = await fetch(`http://localhost:3001/usuarios/${id}`);
        return await resp.json();
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
    }
}

export async function obtenerUsuarios() {
    try {
        const respuesta = await fetch("http://localhost:3001/usuarios");
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
}

export async function actualizarUsuario(id, cambios) {
    try {
        const resp = await fetch(`http://localhost:3001/usuarios/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cambios)
        });
        return await resp.json();
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
    }
}

export async function eliminarUsuario(id) {
    try {
        const resp = await fetch(`http://localhost:3001/usuarios/${id}`, {
            method: "DELETE"
        });
        return await resp.json();
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
}

/*s  */