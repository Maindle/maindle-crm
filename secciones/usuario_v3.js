// Esperar a que se cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const popupBienvenida = document.getElementById("popup-bienvenida");
  const popupFinal = document.getElementById("popup-final");
  const formularioPerfil = document.getElementById("formulario-perfil");
  const subidaDocumentos = document.getElementById("subida-documentos");
  const campoPais = formularioPerfil.querySelector("select[name='pais']");
  const botonCompletar = popupBienvenida.querySelector("button");
  const botonPerfil = formularioPerfil.querySelector("button");
  const botonFinalizar = subidaDocumentos.querySelector("button");
  const local = localStorage;

  // Lista personalizada de países (LATAM, Europa, EE.UU. y países árabes principales)
  const paises = [
    "Alemania", "Arabia Saudita", "Argentina", "Bolivia", "Brasil", "Chile",
    "Colombia", "Costa Rica", "Cuba", "Ecuador", "Egipto", "Emiratos Árabes Unidos",
    "España", "Estados Unidos", "Francia", "Guatemala", "Honduras", "Irak", "Irán",
    "Italia", "Jordania", "Kuwait", "Líbano", "Libia", "Marruecos", "México",
    "Nicaragua", "Omán", "Palestina", "Panamá", "Paraguay", "Perú", "Portugal",
    "Qatar", "Reino Unido", "República Dominicana", "Siria", "Suiza", "Túnez",
    "Uruguay", "Venezuela", "Yemen"
  ];

  // Rellenar select de países
  paises.sort().forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    campoPais.appendChild(option);
  });

  // Mostrar el pop-up de bienvenida si no ha completado aún
  const datosCompletos = local.getItem("datosCompletos") === "true";
  const documentosCompletos = local.getItem("documentosCompletos") === "true";

  if (!datosCompletos) {
    popupBienvenida.style.display = "flex";
  } else if (datosCompletos && !documentosCompletos) {
    formularioPerfil.classList.add("oculto");
    subidaDocumentos.classList.remove("oculto");
  } else if (datosCompletos && documentosCompletos) {
    popupFinal.style.display = "flex";
  }

  // Mostrar formulario de perfil
  botonCompletar.addEventListener("click", () => {
    popupBienvenida.style.display = "none";
    formularioPerfil.classList.remove("oculto");
  });

  // Validar formulario de perfil
  botonPerfil.addEventListener("click", e => {
    e.preventDefault();
    const nombre = formularioPerfil.querySelector("[name='nombre']").value.trim();
    const apellidos = formularioPerfil.querySelector("[name='apellidos']").value.trim();
    const usuario = formularioPerfil.querySelector("[name='usuario']").value.trim();
    const direccion = formularioPerfil.querySelector("[name='direccion']").value.trim();
    const pais = campoPais.value;

    if (nombre && apellidos && usuario && direccion && pais) {
      local.setItem("datosCompletos", "true");
      formularioPerfil.classList.add("oculto");
      subidaDocumentos.classList.remove("oculto");
    } else {
      alert("Por favor, completa todos los campos obligatorios.");
    }
  });

  // Finalizar registro
  botonFinalizar.addEventListener("click", () => {
    local.setItem("documentosCompletos", "true");
    subidaDocumentos.classList.add("oculto");
    popupFinal.style.display = "flex";
  });
});
