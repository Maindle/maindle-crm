document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");
  const sections = document.querySelectorAll(".content-section");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const sectionId = item.getAttribute("data-section");
      sections.forEach((section) => {
        section.classList.add("hidden");
        section.classList.remove("active");
      });
      document.getElementById(sectionId).classList.add("active");
    });
  });

  const form = document.getElementById("formPerfil");
  const guardarBtn = document.getElementById("guardarPerfil");
  const subirBtn = document.getElementById("btnSubir");
  const datosGuardados = document.getElementById("datosGuardados");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    saveProfile();
    document.getElementById("subir-docs").classList.add("active");
    document.getElementById("completar-info").classList.remove("active");
  });

  guardarBtn.addEventListener("click", function () {
    saveProfile();
    alert("Datos guardados correctamente.");
  });

  subirBtn.addEventListener("click", function () {
    alert("Documentos subidos correctamente.");
  });

  function saveProfile() {
    const datos = {
      nombre: document.getElementById("nombre").value,
      apellidos: document.getElementById("apellidos").value,
      usuario: document.getElementById("usuario").value,
      direccion: document.getElementById("direccion").value,
      telefono: document.getElementById("telefono").value,
      prefijo: document.getElementById("prefijo").value,
      pais: document.getElementById("pais").value,
      tin: document.getElementById("tin").value,
    };
    localStorage.setItem("perfilMaindle", JSON.stringify(datos));
    renderPerfil();
  }

  function renderPerfil() {
    const data = JSON.parse(localStorage.getItem("perfilMaindle"));
    if (!data) return;

    const html = `
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Apellidos:</strong> ${data.apellidos}</p>
      <p><strong>Usuario:</strong> ${data.usuario}</p>
      <p><strong>Dirección:</strong> ${data.direccion}</p>
      <p><strong>Teléfono:</strong> ${data.prefijo} ${data.telefono}</p>
      <p><strong>País:</strong> ${data.pais}</p>
      <p><strong>TIN:</strong> ${data.tin || "(No proporcionado)"}</p>
    `;

    datosGuardados.innerHTML = html;
  }

  renderPerfil();
});
