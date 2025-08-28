import {
    obtenerUsuarioPorId,
    crearSolicitud,
    obtenerSolicitudes,
    actualizarSolicitud,
} from "../services/servicios.js";

/* Seleccionamos el contenedor que envuelve los formularios */
const contenedorFormularios = document.getElementById("contenedor_formulario");

/* Seleccionamos todos los formularios dentro del contenedor */
const formularios = contenedorFormularios.getElementsByTagName("form");

/* Contenedores de solicitudes */
const pendientesContainer = document.getElementById("solicitudes_pendientes");
const historialContainer = document.getElementById("solicitudes_historial");

async function main() {
    /* Usuario logueado */
    const usuarioIdStr = sessionStorage.getItem("usuario_id");

    if (!usuarioIdStr) {
        alert("Acceso denegado. No ha iniciado sesión.");
        window.location.href = "../pages/login.html";
        return;
    }

    const usuarioId = Number(usuarioIdStr); // Convertir a número para el fetch

    let usuarioLogueado = null;

    try {
        usuarioLogueado = await obtenerUsuarioPorId(usuarioId);
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
    }

    if (!usuarioLogueado) {
        alert("Acceso denegado. Usuario no encontrado o sesión inválida.");
        sessionStorage.removeItem("usuario_id");
        window.location.href = "../pages/login.html";
        return;
    }

    if (usuarioLogueado.userT !== "student") {
        alert("Acceso denegado. Solo estudiantes pueden ingresar.");
        sessionStorage.removeItem("usuario_id");
        window.location.href = "../pages/login.html";
        return;
    }

    /* Función para cargar solicitudes */
    async function cargarSolicitudes() {
        const solicitudes = await obtenerSolicitudes();
        const solicitudesUsuario = solicitudes.filter(s => s.usuarioId === usuarioLogueado.id);

        pendientesContainer.innerHTML = "";

        for (let s of solicitudesUsuario) {
            if (s.estado === "pendiente") {
                const div = document.createElement("div");
                div.className = "border rounded p-2 mb-2";

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

                div.appendChild(pUsuario);
                div.appendChild(pSede);
                div.appendChild(pPC);
                div.appendChild(pSalida);
                div.appendChild(pRegreso);
                div.appendChild(btnConcluir);

                pendientesContainer.appendChild(div);
            }
        }
    }

    for (let form of formularios) {
        const inputUsuario = form.getElementsByTagName("input")[0];
        inputUsuario.value = usuarioLogueado.username;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const selects = form.getElementsByTagName("select");
            const inputs = form.getElementsByTagName("input");

            const sede = selects[0].value;
            const fechaSalida = inputs[1].value;
            const fechaRegreso = inputs[2].value;
            const codigo = inputs[3].value;
            const condiciones = inputs[4].checked;

            if (!condiciones) {
                alert("Debe aceptar las condiciones.");
                return;
            }

            const nuevaSolicitud = {
                usuarioId: usuarioLogueado.id,
                sede,
                fechaSalida,
                fechaRegreso,
                codigo,
                estado: "pendiente"
            };

            await crearSolicitud(nuevaSolicitud);
            form.reset();
            inputUsuario.value = usuarioLogueado.username;
            cargarSolicitudes();
        });
    }

    cargarSolicitudes();
}

main();