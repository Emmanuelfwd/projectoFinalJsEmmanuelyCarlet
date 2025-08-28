import { obtenerUsuario, crearSolicitud, obtenerSolicitudes, actualizarSolicitud } from "../services/servicios.js";

/* Seleccionamos el contenedor que envuelve los formularios */
const contenedorFormularios = document.getElementById("contenedor_formulario");
F
/* Seleccionamos todos los formularios dentro del contenedor */
const formularios = contenedorFormularios.getElementsByTagName("form");

/* Contenedores de solicitudes */
const pendientesContainer = document.getElementById("solicitudes_pendientes");
const historialContainer = document.getElementById("solicitudes_historial");

/* Usuario logueado */
const usuarioLogueado = JSON.parse(localStorage.getItem("usuario_logueado"));

/* Validación de acceso */
if (!usuarioLogueado || usuarioLogueado.userT !== "normal") {
    alert("Acceso denegado. Por favor intente iniciar el login para admins");
    window.location.href = "../pages/login.html";
}

/* Función para cargar solicitudes */
async function cargarSolicitudes() {
    const solicitudes = await obtenerSolicitudes();
    const solicitudesUsuario = solicitudes.filter(s => s.usuarioId === usuarioLogueado.id);

    /* Pendientes */
    pendientesContainer.innerHTML = "";
    for (let s of solicitudesUsuario) {
        if (s.estado === "pendiente") {
            const div = document.createElement("div");
            div.className = "border rounded p-2 mb-2";

            /* Creamos elementos */
            const pUsuario = document.createElement("p");
            pUsuario.innerHTML = `<b>Usuario:</b> ${usuarioLogueado.username}`;
            const pSede = document.createElement("p");
            pSede.innerHTML = `<b>Sede:</b> ${s.sede}`;
            const pPC = document.createElement("p");
            pPC.innerHTML = `<b>PC:</b> ${s.codigo}`;
            const pSalida = document.createElement("p");
            pSalida.innerHTML = `<b>Fecha de salida:</b> ${s.fechaSalida}`;
            const pRegreso = document.createElement("p");
            pRegreso.innerHTML = `<b>Fecha de regreso:</b> ${s.fechaRegreso}`;
            const btnConcluir = document.createElement("button");
            btnConcluir.className = "btn btn-sm btn-success";
            btnConcluir.textContent = "Concluir";

            btnConcluir.addEventListener("click", async () => {
                await actualizarSolicitud(s.id, { estado: "concluido" });
                cargarSolicitudes();
            });

            /* Añadimos elementos al div */
            div.appendChild(pUsuario);
            div.appendChild(pSede);
            div.appendChild(pPC);
            div.appendChild(pSalida);
            div.appendChild(pRegreso);
            div.appendChild(btnConcluir);

            pendientesContainer.appendChild(div);
        }
    }

    /* Historial */
    historialContainer.innerHTML = "";
    for (let s of solicitudesUsuario) {
        if (s.estado === "concluido") {
            const div = document.createElement("div");
            div.className = "border rounded p-2 mb-2 bg-light";

            const pUsuario = document.createElement("p");
            pUsuario.innerHTML = `<b>Usuario:</b> ${usuarioLogueado.username}`;
            const pSede = document.createElement("p");
            pSede.innerHTML = `<b>Sede:</b> ${s.sede}`;
            const pPC = document.createElement("p");
            pPC.innerHTML = `<b>PC:</b> ${s.codigo}`;
            const pSalida = document.createElement("p");
            pSalida.innerHTML = `<b>Fecha de salida:</b> ${s.fechaSalida}`;
            const pRegreso = document.createElement("p");
            pRegreso.innerHTML = `<b>Fecha de regreso:</b> ${s.fechaRegreso}`;
            const smallFinalizado = document.createElement("small");
            smallFinalizado.className = "text-muted";
            smallFinalizado.textContent = "Finalizado";

            div.appendChild(pUsuario);
            div.appendChild(pSede);
            div.appendChild(pPC);
            div.appendChild(pSalida);
            div.appendChild(pRegreso);
            div.appendChild(smallFinalizado);

            historialContainer.appendChild(div);
        }
    }
}

/* Iteramos sobre todos los formularios del contenedor */
for (let form of formularios) {
    /* Seleccionamos inputs dentro del form */
    const inputUsuario = form.getElementsByTagName("input")[0]; // asumimos que es el primero

    /* Asignamos el nombre del usuario logueado */
    inputUsuario.value = usuarioLogueado.username;

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); /* Evita recarga de página */

        /* Obtenemos los valores de cada input dentro del form usando getElementsByTagName / getElementsByClassName / getElementsByName */
        const selects = form.getElementsByTagName("select");
        const inputs = form.getElementsByTagName("input");

        const sede = selects[0].value;
        const fechaSalida = inputs[1].value; // input de fecha_salida
        const fechaRegreso = inputs[2].value; // input de fecha_regreso
        const codigo = inputs[3].value; // input de codigo_computadora
        const condiciones = inputs[4].checked; // checkbox condiciones

        /* Validación de aceptación de condiciones */
        if (!condiciones) {
            alert("Debe aceptar las condiciones.");
            return;
        }

        /* Creamos el objeto de nueva solicitud */
        const nuevaSolicitud = {
            usuarioId: usuarioLogueado.id,
            sede,
            fechaSalida,
            fechaRegreso,
            codigo,
            estado: "pendiente"
        };

        /* Enviamos la solicitud y recargamos los datos */
        await crearSolicitud(nuevaSolicitud);
        form.reset();
        inputUsuario.value = usuarioLogueado.username;
        cargarSolicitudes();
    });
}

/* Cargamos las solicitudes al inicio */
cargarSolicitudes();
