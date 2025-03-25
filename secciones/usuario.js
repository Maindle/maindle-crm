
window.addEventListener("DOMContentLoaded", () => {
  const registrado = localStorage.getItem("usuarioRegistrado");
  const estado = localStorage.getItem("estadoOnboarding"); // puede ser: null, 'inicio', 'perfil', 'documentacion'

  if (!registrado) {
    alert("Debes registrarte antes de acceder al panel.");
    window.location.href = "../registro.html";
    return;
  }

  if (!estado || estado === "inicio") {
    mostrarPopup("popup-bienvenida");
    return;
  }

  if (estado === "perfil") {
    mostrarSeccion("formulario-documentos");
    return;
  }

  if (estado === "documentacion") {
    mostrarPopup("popup-final");
    mostrarSeccion("sidebar");
  }
});

function mostrarPopup(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("oculto");
}

function ocultarPopup(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("oculto");
}

function mostrarSeccion(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("oculto");
}

function mostrarFormulario() {
  ocultarPopup("popup-bienvenida");
  mostrarSeccion("formulario-perfil");
  cargarPaises();
}

// Guardar perfil
document.addEventListener("DOMContentLoaded", () => {
  const formPerfil = document.getElementById("formPerfil");
  if (formPerfil) {
    formPerfil.addEventListener("submit", function (e) {
      e.preventDefault();
      const datos = Object.fromEntries(new FormData(this));
      localStorage.setItem("perfilDatos", JSON.stringify(datos));
      localStorage.setItem("estadoOnboarding", "perfil");

      this.classList.add("oculto");
      mostrarSeccion("formulario-documentos");
    });
  }

  const finalizarBtn = document.getElementById("finalizarDocumentos");
  if (finalizarBtn) {
    finalizarBtn.addEventListener("click", function () {
      localStorage.setItem("estadoOnboarding", "documentacion");
      document.getElementById("formulario-documentos").classList.add("oculto");
      mostrarPopup("popup-final");
      mostrarSeccion("sidebar");
    });
  }
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
    form.innerHTML += `<label>${key}: <input name="${key}" value="${datos[key]}"></label>`;
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
  if (select) {
    select.innerHTML = "";
    paises.sort().forEach(p => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p;
      select.appendChild(opt);
    });
  }
}
