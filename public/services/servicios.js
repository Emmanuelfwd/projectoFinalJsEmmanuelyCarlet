export async function obtenerUsuario(userName, password) {
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