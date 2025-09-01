Mi README 



\# Sistema de Gestión de Solicitudes y Usuarios



\## Descripción



Este proyecto es una aplicación web para la gestión de solicitudes de permisos y el registro y administración de usuarios (incluyendo administradores). Permite que los usuarios registren solicitudes de permiso, y que los administradores puedan gestionar estas solicitudes y administrar usuarios desde un panel de control.



---



\## Funcionalidades Principales



\- Registro de usuarios estándar y administradores.

\- Inicio de sesión con validación.

\- Formulario para que los usuarios creen solicitudes de permiso.

\- Visualización de solicitudes pendientes y concluidas para administradores.

\- Panel de control para que administradores vean y gestionen usuarios registrados.

\- Validaciones básicas en formularios (como confirmación de contraseña y aceptación de términos).



---



\## Estructura de Archivos



\### HTML



\- `registroadmin.html`: Formulario para registrar administradores.

\- `registro.html`: Formulario para registrar usuarios estándar.

\- `main.html`: Formulario para crear solicitudes de permiso.

\- `login.html`: Página de inicio de sesión.

\- `adminPanel.html`: Panel de control para administradores que muestra todos los usuarios registrados.

\- `admin.page.html`: Página principal de administrador con listas de solicitudes pendientes y concluidas.



\### JavaScript



\- `servicios.js`: Funciones para consumir APIs REST (obtener, crear, actualizar usuarios y solicitudes).

\- `registroA.js`: Lógica para registrar administradores.

\- `registroE.js`: Lógica para registrar usuarios estándar.

\- `login.js`: Lógica para autenticación de usuarios.

\- `formulario.js`: Manejo de envío y visualización de solicitudes.

\- `adminpage.js`: Carga y muestra solicitudes para administrador.

\- `adminPanel.js`: Carga y muestra lista de usuarios para administrador.



\### CSS



\- Estilos específicos para cada página, ubicados en `assets/` (por ejemplo, `adminregistro.css`, `styleMain.css`, `admin.css`, `adminPanel.css`).



---



\## Tecnologías Usadas



\- HTML5  

\- CSS3 (incluye Bootstrap 5 para algunos estilos y componentes)  

\- JavaScript (módulos ES6)  

\- Fetch API para comunicación con backend REST  

\- Backend simulado con JSON Server (asumiendo puerto 3001 para APIs)



---



\## Configuración y Uso



1\. Clonar el repositorio o descargar los archivos.



2\. Asegurarse de tener corriendo un servidor backend (por ejemplo JSON Server) en `http://localhost:3001` con recursos para `usuarios` y `Solicitud`.



3\. Abrir las páginas HTML desde un servidor local o directamente en navegador.



4\. Navegar entre las páginas para:

&nbsp;   - Registrar usuarios o administradores.

&nbsp;   - Iniciar sesión.

&nbsp;   - Crear y visualizar solicitudes.

&nbsp;   - Administrar usuarios y solicitudes si se tiene acceso de administrador.





Link Trello https://trello.com/invite/b/68ae2146e047ec553e91c659/ATTI1c3ae5f42799ffdc907bfdb4abebda0bE69F966C/sistema-de-permisos-para-uso-de-computadoras-academicas
