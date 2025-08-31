import { obtenerUsuarios, actualizarUsuario, eliminarUsuario } from '../services/servicios.js';

document.addEventListener("DOMContentLoaded", async () => {
    const cuerpoTabla = document.getElementById("tabla-usuarios");
    const usuarios = await obtenerUsuarios();

    usuarios.forEach(usuario => {
        const fila = document.createElement("tr");

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
                <button class="modificar-btn">Modificar</button>
                <button class="eliminar-btn">Eliminar</button>
            </td>
        `;

        // Obtener referencias a los inputs y botones
        const inputs = fila.querySelectorAll("input, select");
        const modificarBtn = fila.querySelector(".modificar-btn");
        const eliminarBtn = fila.querySelector(".eliminar-btn");

        // Modificar usuario
        modificarBtn.addEventListener("click", async () => {
            const nuevosDatos = {
                username: inputs[1].value,
                password: inputs[2].value,
                userT: inputs[3].value
            };
            await actualizarUsuario(usuario.id, nuevosDatos);
            alert("Usuario actualizado correctamente.");
        });

        // Eliminar usuario
        eliminarBtn.addEventListener("click", async () => {
            const confirmacion = confirm(`¿Estás seguro de eliminar a ${usuario.username}?`);
            if (confirmacion) {
                await eliminarUsuario(usuario.id);
                fila.remove(); // Elimina la fila de la tabla
                alert("Usuario eliminado.");
            }
        });

        cuerpoTabla.appendChild(fila);
    });
});