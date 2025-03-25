
window.onload = () => {
  const estado = localStorage.getItem("usuarioEstado");
  if (!estado) {
    alert("Debes registrarte antes de acceder.");
    window.location.href = "registro.html";
    return;
  }

  cargarPaises();

  switch (estado) {
    case "inicio":
      document.getElementById("popup-bienvenida").style.display = "flex";
      break;
    case "perfil":
      document.getElementById("formulario-perfil").classList.remove("oculto");
      break;
    case "documentacion":
      document.getElementById("subida-documentos").classList.remove("oculto");
      break;
    case "completo":
      document.getElementById("popup-final").style.display = "flex";
      document.getElementById("sidebar").classList.remove("oculto");
      break;
  }
};

function mostrarFormulario() {
  document.getElementById("popup-bienvenida").style.display = "none";
  document.getElementById("formulario-perfil").classList.remove("oculto");
  localStorage.setItem("usuarioEstado", "perfil");
}

document.getElementById("formPerfil").addEventListener("submit", function (e) {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(this));
  localStorage.setItem("perfilDatos", JSON.stringify(datos));
  localStorage.setItem("usuarioEstado", "documentacion");
  document.getElementById("formulario-perfil").classList.add("oculto");
  document.getElementById("subida-documentos").classList.remove("oculto");
});

function finalizarRegistro() {
  localStorage.setItem("usuarioEstado", "completo");
  document.getElementById("subida-documentos").classList.add("oculto");
  document.getElementById("popup-final").style.display = "flex";
  document.getElementById("sidebar").classList.remove("oculto");
}

function verDatos() {
  const datos = JSON.parse(localStorage.getItem("perfilDatos"));
  alert(JSON.stringify(datos, null, 2));
}

function editarDatos() {
  alert("Funcionalidad de edición en desarrollo.");
}

function cargarPaises() {
  const paises = [
    "Argentina", "Brasil", "Chile", "Colombia", "México", "Perú", "Uruguay", "Venezuela",
    "España", "Francia", "Alemania", "Italia", "Portugal", "Reino Unido", "Estados Unidos",
    "Arabia Saudita", "Emiratos Árabes Unidos", "Kuwait", "Qatar", "Egipto"
  ];
  const select = document.querySelector("select[name='pais']");
  paises.sort().forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}
