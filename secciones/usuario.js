window.onload = () => {
  const registrado = localStorage.getItem("usuarioRegistrado");
  const perfilCompleto = localStorage.getItem("perfilCompleto");

  if (!registrado) {
    alert("Debes registrarte antes de acceder al panel.");
    window.location.href = "registro.html";
    return;
  }

  if (!perfilCompleto) {
    document.getElementById("popup-bienvenida").style.display = "flex";
  } else {
    document.getElementById("popup-final").style.display = "flex";
    document.getElementById("sidebar").classList.remove("oculto");
  }

  cargarPaises();

  document.getElementById("menu-perfil").addEventListener("change", (e) => {
    if (e.target.value === "revisar") verDatos();
    if (e.target.value === "editar") editarDatos();
  });

  const dropzone = document.getElementById("dropzone");
  const input = document.getElementById("documentos");

  dropzone.addEventListener("click", () => input.click());
  dropzone.addEventListener("dragover", e => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
  dropzone.addEventListener("drop", e => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    input.files = e.dataTransfer.files;
  });
};

function mostrarFormulario() {
  document.getElementById("popup-bienvenida").style.display = "none";
  document.getElementById("formulario-perfil").classList.remove("oculto");

  const datosGuardados = JSON.parse(localStorage.getItem("perfilDatos"));
  if (datosGuardados) {
    for (const campo in datosGuardados) {
      if (document.querySelector(`[name="${campo}"]`)) {
        document.querySelector(`[name="${campo}"]`).value = datosGuardados[campo];
      }
    }
  }
}

document.getElementById("formPerfil").addEventListener("submit", function(e) {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(this));
  localStorage.setItem("perfilDatos", JSON.stringify(datos));
  document.getElementById("formulario-perfil").classList.add("oculto");
  document.getElementById("documentos-section").classList.remove("oculto");
});

function finalizarRegistro() {
  localStorage.setItem("perfilCompleto", "true");
  document.getElementById("documentos-section").classList.add("oculto");
  document.getElementById("popup-final").style.display = "flex";
  document.getElementById("sidebar").classList.remove("oculto");
}

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

function cargarPaises() {
  const paises = [
    "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", "Ecuador", "El Salvador", "España",
    "Estados Unidos", "Francia", "Guatemala", "Honduras", "Irlanda", "Italia", "México", "Nicaragua", "Panamá",
    "Paraguay", "Perú", "Portugal", "Reino Unido", "República Dominicana", "Suecia", "Suiza", "Uruguay",
    "Venezuela", "Arabia Saudita", "Catar", "Egipto", "Emiratos Árabes Unidos", "Jordania", "Kuwait", "Líbano",
    "Marruecos", "Omán", "Túnez", "Bahréin", "Alemania", "Bélgica", "Austria", "Países Bajos", "Dinamarca",
    "Finlandia", "Noruega", "Grecia", "Polonia", "Rumanía", "Hungría"
  ];
  const select = document.querySelector("select[name='pais']");
  paises.sort().forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}



function toggleMenu(elemento) {
  const lista = elemento.nextElementSibling;
  lista.style.display = (lista.style.display === "block") ? "none" : "block";
}
