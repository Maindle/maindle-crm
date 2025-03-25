document.addEventListener("DOMContentLoaded", function () {
  const popupInicio = document.getElementById("popup-inicio");
  const popupFormulario = document.getElementById("popup-formulario");
  const popupDocumentos = document.getElementById("popup-documentos");

  // Mostrar pop-up de bienvenida al iniciar
  popupInicio.classList.remove("oculto");

  // Mostrar formulario
  window.mostrarCompletar = () => {
    popupInicio.classList.add("oculto");
    popupFormulario.classList.remove("oculto");
  };

  window.cerrarPopup = () => {
    popupInicio.classList.add("oculto");
  };

  window.mostrarSubida = () => {
    popupFormulario.classList.add("oculto");
    popupDocumentos.classList.remove("oculto");
  };

  window.mostrarVer = () => {
    alert("Aquí verás tu perfil cargado (modo solo lectura)");
  };

  window.mostrarEditar = () => {
    alert("Aquí podrás editar tu información cargada");
  };

  window.seleccionarArchivo = () => {
    document.getElementById("input-archivos").click();
  };

  window.finalizarRegistro = () => {
    popupDocumentos.classList.add("oculto");
    alert("Documentación subida. ¡Bienvenido a tu espacio!");
  };

  window.guardarDatos = () => {
    alert("Datos guardados localmente (demo)");
  };

  // Cargar países personalizados
  const paises = [
    "Alemania", "Arabia Saudita", "Argentina", "Austria", "Bélgica", "Bolivia", "Chile", "Colombia", "Costa Rica", "Dinamarca",
    "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "España", "Estados Unidos", "Finlandia", "Francia",
    "Grecia", "Guatemala", "Honduras", "Hungría", "Irlanda", "Italia", "Jordania", "Kuwait", "Líbano", "Marruecos", "México",
    "Nicaragua", "Noruega", "Omán", "Países Bajos", "Panamá", "Paraguay", "Perú", "Polonia", "Portugal", "Qatar",
    "Reino Unido", "República Dominicana", "Rumanía", "Suecia", "Suiza", "Túnez", "Uruguay", "Venezuela"
  ];
  const selectPais = document.getElementById("pais");
  paises.sort().forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    selectPais.appendChild(option);
  });
});
// Updated JavaScript logic will go here
