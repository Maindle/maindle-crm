
window.onload = () => {
  const registrado = localStorage.getItem("usuarioRegistrado");
  const perfilCompleto = localStorage.getItem("perfilCompleto");
  const documentacionSubida = localStorage.getItem("documentacionSubida");

  if (!registrado) {
    alert("Debes registrarte antes de acceder al panel.");
    window.location.href = "../registro.html";
    return;
  }

  if (!perfilCompleto) {
    document.getElementById("popup-bienvenida").style.display = "flex";
  } else if (!documentacionSubida) {
    document.getElementById("formulario-documentos").classList.remove("oculto");
  } else {
    document.getElementById("popup-final").style.display = "flex";
    document.getElementById("sidebar").classList.remove("oculto");
  }

  cargarPaises();
};

// Mostrar formulario de perfil
function mostrarFormulario() {
  document.getElementById("popup-bienvenida").style.display = "none";
  document.getElementById("formulario-perfil").classList.remove("oculto");
}

// Guardar perfil
document.getElementById("formPerfil").addEventListener("submit", function (e) {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(this));
  localStorage.setItem("perfilDatos", JSON.stringify(datos));
  localStorage.setItem("perfilCompleto", "true");

  document.getElementById("formulario-perfil").classList.add("oculto");
  document.getElementById("formulario-documentos").classList.remove("oculto");
});

// Subida de documentación
document.getElementById("finalizarDocumentos").addEventListener("click", function () {
  localStorage.setItem("documentacionSubida", "true");

  document.getElementById("formulario-documentos").classList.add("oculto");
  document.getElementById("popup-final").style.display = "flex";
  document.getElementById("sidebar").classList.remove("oculto");
});

// Revisar datos
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

// Editar datos
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

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const nuevos = Object.fromEntries(new FormData(this));
    localStorage.setItem("perfilDatos", JSON.stringify(nuevos));
    verDatos();
  });
}

function cancelarCambios() {
  verDatos();
}

// Paises relevantes (LATAM, Europa, EEUU, árabes)
function cargarPaises() {
  const paises = [
    "Alemania", "Arabia Saudita", "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica",
    "Cuba", "Dinamarca", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "España",
    "Estados Unidos", "Francia", "Guatemala", "Honduras", "Irak", "Irán", "Italia", "Jordania",
    "Kuwait", "Líbano", "México", "Marruecos", "Nicaragua", "Noruega", "Omán", "Panamá", "Paraguay",
    "Perú", "Portugal", "Qatar", "Reino Unido", "Suecia", "Suiza", "Siria", "Túnez", "Uruguay", "Venezuela"
  ];
  const select = document.querySelector("select[name='pais']");
  paises.sort().forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}
