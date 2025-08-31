import { obtenerUsuarios, actualizarUsuario, eliminarUsuario } from '../services/servicios.js';

document.addEventListener("DOMContentLoaded", async () => {
    const cuerpoTabla = document.getElementById("tabla-usuarios"); /* Contenedor de las filas */
    const usuarios = await obtenerUsuarios(); /* Traemos la lista de usuarios del servicio */

    usuarios.forEach(usuario => {
        const fila = document.createElement("tr"); /* Creamos una fila por cada usuario */

        /* Definimos el contenido HTML de la fila */
        fila.innerHTML = `
            <td><input type="text" value="${usuario.id}" disabled></td>
            <td><input type="text" value="${usuario.username}"></td>
            <td><input type="text" value="${usuario.password}"></td>
            <td>
                <select>
                    <option value="admin" ${usuario.userT === "admin" ? "selected" : ""}>admin</option>
                    <option value="student" ${usuario.userT === "student" ? "selected" : ""}>student</option>
                </select>
            </td>
            <td>
                <button>Modificar</button>
                <button>Eliminar</button>
            </td>
        `;

        /* Convertimos las celdas en array para acceder más fácil */
        const celdas = Array.from(fila.cells);

        /* Guardamos referencias a los elementos de cada celda */
        const idInput = celdas[0].firstElementChild;        /* Input con el ID (solo lectura) */
        const usernameInput = celdas[1].firstElementChild;  /* Input con el nombre de usuario */
        const passwordInput = celdas[2].firstElementChild;  /* Input con la contraseña */
        const userSelect = celdas[3].firstElementChild;     /* Select para elegir el tipo de usuario */
        const modificarBtn = celdas[4].children[0];         /* Botón "Modificar" */
        const eliminarBtn = celdas[4].children[1];          /* Botón "Eliminar" */

        /* Acción: Modificar usuario */
        modificarBtn.addEventListener("click", async () => {
            const nuevosDatos = {
                username: usernameInput.value, /* Nuevo username */
                password: passwordInput.value, /* Nueva contraseña */
                userT: userSelect.value        /* Nuevo tipo de usuario */
            };
            await actualizarUsuario(usuario.id, nuevosDatos); /* Llamamos al servicio para actualizar */
            alert("Usuario actualizado correctamente.");       /* Confirmación visual */
        });

        /* Acción: Eliminar usuario */
        eliminarBtn.addEventListener("click", async () => {
            const confirmacion = confirm(`¿Estás seguro de eliminar a ${usuario.username}?`); /* Confirmación */
            if (confirmacion) {
                await eliminarUsuario(usuario.id); /* Llamamos al servicio para eliminar */
                fila.remove();                     /* Quitamos la fila de la tabla */
                alert("Usuario eliminado.");       /* Confirmación visual */
            }
        });

        /* Finalmente agregamos la fila construida al cuerpo de la tabla */
        cuerpoTabla.appendChild(fila);
    });
});