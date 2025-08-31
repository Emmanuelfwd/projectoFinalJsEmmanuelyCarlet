import { obtenerSolicitudes, obtenerUsuarioPorId } from '../services/servicios.js';

document.addEventListener("DOMContentLoaded", async () => {
    const listaPendientes = document.getElementById("lista-pendientes");
    const listaConcluidas = document.getElementById("lista-concluidas");

    const solicitudes = await obtenerSolicitudes();

    for (const solicitud of solicitudes) {
        // Si la solicitud está incompleta o vacía, la ignoramos
        if (!solicitud.estado || !solicitud.usuarioId) continue;

        // Obtener nombre del usuario
        const usuario = await obtenerUsuarioPorId(solicitud.usuarioId);
        const nombreUsuario = usuario?.username || "Usuario desconocido";

        const item = document.createElement("li");
        item.innerHTML = `
            <strong>Usuario:</strong> ${nombreUsuario} <br>
            <strong>Sede:</strong> ${solicitud.sede || "No especificado"} <br>
            <strong>Fecha de Salida:</strong> ${solicitud.fechaSalida || "No especificada"} <br>
            <strong>Fecha de Regreso:</strong> ${solicitud.fechaRegreso || "No especificada"} <br>
            <strong>Código:</strong> ${solicitud.codigo || "No especificado"} <br>
            <strong>Estado:</strong> ${solicitud.estado}
        `;

        if (solicitud.estado === "concluido") {
            listaConcluidas.appendChild(item);
        } else {
            listaPendientes.appendChild(item);
        }
    }
});