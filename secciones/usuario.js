window.onload = () => {
  const registrado = localStorage.getItem("usuarioRegistrado");
  const perfilCompleto = localStorage.getItem("perfilCompleto");
  const docsSubidos = localStorage.getItem("documentacionSubida");

  if (!registrado) {
    alert("Debes registrarte antes de acceder al panel.");
    window.location.href = "registro.html";
    return;
  }

  if (!perfilCompleto) {
    mostrarPopup("popup-bienvenida");
    return;
  }

  if (!docsSubidos) {
    document.getElementById("formulario-documentos").classList.remove("oculto");
    return;
  }

  document.getElementById("sidebar").classList.remove("oculto");
};

function mostrarPopup(id) {
  document.getElementById(id).classList.remove("oculto");
}

function ocultarPopup(id) {
  document.getElementById(id).classList.add("oculto");
}

function mostrarFormulario() {
  ocultarPopup("popup-bienvenida");
  document.getElementById("formulario-perfil").classList.remove("oculto");
  cargarPaises();
}

document.getElementById("formPerfil").addEventListener("submit", function (e) {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(this));
  localStorage.setItem("perfilDatos", JSON.stringify(datos));
  localStorage.setItem("perfilCompleto", "true");
  document.getElementById("formulario-perfil").classList.add("oculto");
  document.getElementById("formulario-documentos").classList.remove("oculto");
});

document.getElementById("finalizarDocumentos").addEventListener("click", function () {
  localStorage.setItem("documentacionSubida", "true");
  document.getElementById("formulario-documentos").classList.add("oculto");
  mostrarPopup("popup-final");
  document.getElementById("sidebar").classList.remove("oculto");
});

function verDatos() {
  const datos = JSON.parse(localStorage.getItem("perfilDatos"));
  if (!datos) return;

  let html = `<h2>Datos del Perfil</h2>`;
  for (let key in datos) {
    html += `<p><strong>${key}:</strong> ${datos[key]}</p>`;
  }

  const cont = document.getElementById("vista-datos");
  cont.innerHTML = html;
  cont.classList.remove("oculto");
}

function editarDatos() {
  const datos = JSON.parse(localStorage.getItem("perfilDatos"));
  if (!datos) return;

  const form = document.createElement("form");
  form.id = "editarForm";
  for (let key in datos) {
    form.innerHTML += `
      <label>${key}: <input name="${key}" value="${datos[key]}"></label>
    `;
  }

  form.innerHTML += `
    <button class="blanco" type="submit">Guardar</button>
    <button class="blanco" type="button" onclick="cancelarCambios()">Cancelar cambios</button>
  `;

  const cont = document.getElementById("vista-datos");
  cont.innerHTML = "";
  cont.appendChild(form);
  cont.classList.remove("oculto");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nuevos = Object.fromEntries(new FormData(this));
    localStorage.setItem("perfilDatos", JSON.stringify(nuevos));
    verDatos();
  });
}

function cancelarCambios() {
  verDatos();
}

function cargarPaises() {
  const paises = [
    "Argentina", "Brasil", "Chile", "Colombia", "México", "Perú", "Uruguay", "Venezuela",
    "España", "Francia", "Italia", "Alemania", "Portugal", "Reino Unido", "Países Bajos",
    "Estados Unidos", "Canadá",
    "Arabia Saudita", "Emiratos Árabes Unidos", "Kuwait", "Catar", "Marruecos", "Egipto"
  ];
  const select = document.querySelector("select[name='pais']");
  select.innerHTML = "";
  paises.sort
