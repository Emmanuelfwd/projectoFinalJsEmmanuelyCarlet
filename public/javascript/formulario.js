import {
    obtenerUsuarioPorId,
    crearSolicitud,
    obtenerSolicitudes,
    actualizarSolicitud,
} from "../services/servicios.js";

const contenedorFormularios = document.getElementById("contenedor_formulario");
const formularios = contenedorFormularios.getElementsByTagName("form");
const pendientesContainer = document.getElementById("solicitudes_pendientes");
const historialContainer = document.getElementById("solicitudes_historial");

async function main() {
    const usuarioIdStr = sessionStorage.getItem("usuario_id");
    const usuarioId = usuarioIdStr;

    if (!usuarioIdStr) {
        alert("Acceso denegado. No ha iniciado sesión.");
        window.location.href = "../pages/login.html";
        return;
    }

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

    async function cargarSolicitudes() {
        const solicitudes = await obtenerSolicitudes();
        const solicitudesUsuario = solicitudes.filter(s => s.usuarioId === usuarioLogueado.id);

        pendientesContainer.innerHTML = "";
        historialContainer.innerHTML = "";

        for (let s of solicitudesUsuario) {
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
            const pEstado = document.createElement("p");
            pEstado.innerHTML = `<b>Estado:</b> ${s.estado}`;

            if (s.estado === "pendiente") {
                const btnConcluir = document.createElement("button");
                btnConcluir.className = "btn btn-sm btn-success";
                btnConcluir.textContent = "Concluir";

                btnConcluir.addEventListener("click", async () => {
                    const fechaActual = new Date().toISOString().slice(0, 10);
                    await actualizarSolicitud(s.id, { estado: "concluido", fechaRegreso: fechaActual });
                    cargarSolicitudes();
                });

                div.appendChild(pUsuario);
                div.appendChild(pSede);
                div.appendChild(pPC);
                div.appendChild(pSalida);
                div.appendChild(pRegreso);
                div.appendChild(pEstado);
                div.appendChild(btnConcluir);

                pendientesContainer.appendChild(div);
            } else if (s.estado === "concluido") {
                div.appendChild(pUsuario);
                div.appendChild(pSede);
                div.appendChild(pPC);
                div.appendChild(pSalida);
                div.appendChild(pRegreso);
                div.appendChild(pEstado);
                historialContainer.appendChild(div);
            }
        }
    }

    for (let form of formularios) {
        const inputUsuario = form.getElementsByTagName("input")[0];
        inputUsuario.value = usuarioLogueado.username;

        const fechaSalidaInput = form.getElementsByTagName("input")[1];
        const fechaRegresoInput = form.getElementsByTagName("input")[2];

        const hoy = new Date().toISOString().slice(0, 10);
        fechaSalidaInput.value = hoy;
        fechaSalidaInput.readOnly = true;
        fechaRegresoInput.value = "";
        fechaRegresoInput.readOnly = true;

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
            fechaSalidaInput.value = hoy;
            fechaSalidaInput.readOnly = true;
            fechaRegresoInput.value = "";
            fechaRegresoInput.readOnly = true;

            cargarSolicitudes();
        });
    }


    cargarSolicitudes();
}

main();