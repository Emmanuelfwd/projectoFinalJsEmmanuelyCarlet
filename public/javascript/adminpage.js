import { obtenerSolicitudes, obtenerUsuarioPorId } from '../services/servicios.js';

/* Función principal que inicia todo */
async function init() {
    /* Obtenemos el contenedor principal donde pondremos las secciones */
    const container = document.getElementById("sedes-container");

    /* Traemos todas las solicitudes desde el JSON/servicio */
    const solicitudes = await obtenerSolicitudes();

    /* Si no hay solicitudes, mostramos mensaje y salimos */
    if (!solicitudes || solicitudes.length === 0) {
        container.innerHTML = "<p>No hay solicitudes disponibles</p>";
        return;
    }

    /* Obtenemos todas las sedes únicas */
    const sedes = [];
    for (let i = 0; i < solicitudes.length; i++) {
        const sedeNorm = normalizeSede(solicitudes[i].sede);
        if (!sedes.includes(sedeNorm)) {
            sedes.push(sedeNorm);
        }
    }

    /* Por cada sede, creamos una sección con listas Pendientes y Concluidas */
    for (let i = 0; i < sedes.length; i++) {
        const sede = sedes[i];

        /* Crear sección HTML */
        const section = document.createElement("section");
        section.className = "sede-section";

        /* Título de la sede */
        const h2 = document.createElement("h2");
        h2.innerText = capitalize(sede);
        section.appendChild(h2);

        /* Crear contenedor de grid para Pendientes y Concluidas */
        const grid = document.createElement("div");
        grid.className = "sede-grid";

        /* Columna de Pendientes */
        const divPend = document.createElement("div");
        const hPend = document.createElement("h3");
        hPend.innerText = "Entregas Pendientes";
        const ulPend = document.createElement("ul");
        ulPend.id = "pend-" + sede;
        ulPend.className = "solicitudes-list";
        divPend.appendChild(hPend);
        divPend.appendChild(ulPend);

        /* Columna de Concluidas */
        const divComp = document.createElement("div");
        const hComp = document.createElement("h3");
        hComp.innerText = "Entregas Concluidas";
        const ulComp = document.createElement("ul");
        ulComp.id = "comp-" + sede;
        ulComp.className = "solicitudes-list";
        divComp.appendChild(hComp);
        divComp.appendChild(ulComp);

        /* Agregamos columnas al grid y el grid a la sección */
        grid.appendChild(divPend);
        grid.appendChild(divComp);
        section.appendChild(grid);

        /* Agregamos la sección al contenedor principal */
        container.appendChild(section);

        /* Filtrar solicitudes por sede y estado */
        const pendientes = solicitudes.filter(s => normalizeSede(s.sede) === sede && !isConcluida(s.estado));
        const concluidas = solicitudes.filter(s => normalizeSede(s.sede) === sede && isConcluida(s.estado));

        /* Renderizamos cada lista */
        await renderList("pend-" + sede, pendientes);
        await renderList("comp-" + sede, concluidas);
    }
}

/* Función que renderiza las solicitudes dentro de un UL */
async function renderList(ulId, items) {
    const ul = document.getElementById(ulId);
    ul.innerHTML = ""; /* Limpiamos UL antes de agregar elementos */

    /* Si no hay elementos, mostramos mensaje */
    if (items.length === 0) {
        const li = document.createElement("li");
        li.className = "empty";
        li.innerText = "No hay registros";
        ul.appendChild(li);
        return;
    }

    /* Por cada solicitud, creamos un LI con sus datos */
    for (let i = 0; i < items.length; i++) {
        const s = items[i];

        /* Obtener nombre de usuario desde el servicio */
        const usuario = await obtenerUsuarioPorId(s.usuarioId);
        const nombreUsuario = (usuario && usuario.username) ? usuario.username : "Usuario desconocido";

        /* Crear LI y contenido HTML */
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

        /* Agregamos el LI a la UL */
        ul.appendChild(li);
    }
}

/* Función para normalizar el nombre de la sede */
function normalizeSede(s) {
    if (!s) return "sin-sede";
    const v = String(s).toLowerCase();
    if (v.includes("pacific") || v.includes("puntare")) return "puntarenas";
    if (v.includes("capri")) return "capri";
    return v.replace(/\s+/g, "-");
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
