import { obtenerSolicitudes, obtenerUsuarioPorId } from '../services/servicios.js';

/* Función principal que inicia todo */
async function init() {
    const container = document.getElementById("sedes-container");
    const solicitudes = await obtenerSolicitudes();

    if (!solicitudes || solicitudes.length === 0) {
        container.innerHTML = "<p>No hay solicitudes disponibles</p>";
        return;
    }

    // Obtener sedes únicas, ignorando solicitudes sin sede
    const sedes = [];
    for (let i = 0; i < solicitudes.length; i++) {
        const sedeNorm = normalizeSede(solicitudes[i].sede);
        if (sedeNorm && sedeNorm !== "sin-sede" && !sedes.includes(sedeNorm)) {
            sedes.push(sedeNorm);
        }
    }

    // Por cada sede, crear sección
    for (let i = 0; i < sedes.length; i++) {
        const sede = sedes[i];

        const section = document.createElement("section");
        section.className = "sede-section";

        const h2 = document.createElement("h2");
        h2.innerText = capitalize(sede);
        section.appendChild(h2);

        const grid = document.createElement("div");
        grid.className = "sede-grid";

        // Pendientes
        const divPend = document.createElement("div");
        const hPend = document.createElement("h3");
        hPend.innerText = "Entregas Pendientes";
        const ulPend = document.createElement("ul");
        ulPend.id = "pend-" + sede;
        ulPend.className = "solicitudes-list";
        divPend.appendChild(hPend);
        divPend.appendChild(ulPend);

        // Concluidas
        const divComp = document.createElement("div");
        const hComp = document.createElement("h3");
        hComp.innerText = "Entregas Concluidas";
        const ulComp = document.createElement("ul");
        ulComp.id = "comp-" + sede;
        ulComp.className = "solicitudes-list";
        divComp.appendChild(hComp);
        divComp.appendChild(ulComp);

        grid.appendChild(divPend);
        grid.appendChild(divComp);
        section.appendChild(grid);
        container.appendChild(section);

        // Filtrar solicitudes por sede
        const pendientes = solicitudes.filter(s => normalizeSede(s.sede) === sede && !isConcluida(s.estado));
        const concluidas = solicitudes.filter(s => normalizeSede(s.sede) === sede && isConcluida(s.estado));

        // Renderizar listas
        await renderList("pend-" + sede, pendientes);
        await renderList("comp-" + sede, concluidas);
    }
}

/* Función que renderiza las solicitudes dentro de un UL */
async function renderList(ulId, items) {
    const ul = document.getElementById(ulId);
    ul.innerHTML = "";

    if (items.length === 0) {
        const li = document.createElement("li");
        li.className = "empty";
        li.innerText = "No hay registros";
        ul.appendChild(li);
        return;
    }

    for (let i = 0; i < items.length; i++) {
        const s = items[i];
        const usuario = await obtenerUsuarioPorId(s.usuarioId);
        const nombreUsuario = (usuario && usuario.username) ? usuario.username : "Usuario desconocido";

        const li = document.createElement("li");
        li.className = isConcluida(s.estado) ? "solicitud-concluida" : "solicitud-pendiente";
        li.innerHTML =
            "<div class='solicitud-item'>" +
            "<p><strong>Usuario:</strong> " + nombreUsuario + "</p>" +
            "<p><strong>Sede:</strong> " + (s.sede || "No especificado") + "</p>" +
            "<p><strong>Fecha de Salida:</strong> " + (s.fechaSalida || "No especificada") + "</p>" +
            "<p><strong>Fecha de Regreso:</strong> " + (s.fechaRegreso || "No especificada") + "</p>" +
            "<p><strong>Código:</strong> " + (s.codigo || "No especificado") + "</p>" +
            "<p><strong>Estado:</strong> " + s.estado + "</p>" +
            "</div>";
        ul.appendChild(li);
    }
}

/* Función para normalizar el nombre de la sede */
function normalizeSede(s) {
    if (!s) return null; /* Si no hay sede, devolvemos null para ignorar */
    const v = String(s).toLowerCase();
    if (v.includes("pacific") || v.includes("puntare")) return "puntarenas";
    if (v.includes("capri")) return "capri";
}

/* Función que determina si una solicitud está concluida */
function isConcluida(estado) {
    if (!estado) return false;
    const e = String(estado).toLowerCase();
    return e.includes("conclu") || e.includes("entreg") || e.includes("complet");
}

/* Función para capitalizar la primera letra de un texto */
function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}

/* Ejecutar la inicialización */
init();

const cerrarSesion = document.getElementById("btnSession");

cerrarSesion.addEventListener('click', function() {
    /* borrar session storage */
    sessionStorage.clear( );
    location.reload();
    
})