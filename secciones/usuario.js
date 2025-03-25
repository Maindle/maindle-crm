
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("usuarioRegistrado")) {
    window.location.href = "registro.html";
    return;
  }

  const perfilCompleto = localStorage.getItem("perfilCompleto");

  if (!perfilCompleto) {
    document.getElementById("popup-bienvenida").style.display = "flex";
  } else {
    document.getElementById("popup-final").classList.remove("oculto");
  }

  document.getElementById("formPerfil").addEventListener("submit", function (e) {
    e.preventDefault();

    const datos = {
      nombre: this.nombre.value,
      apellidos: this.apellidos.value,
      usuario: this.usuario.value,
      pais: this.pais.value,
      direccion: this.direccion.value,
      tin: this.tin.value
    };

    localStorage.setItem("datosPerfil", JSON.stringify(datos));
    document.getElementById("formulario-perfil").classList.add("oculto");
    document.getElementById("documentos-section").classList.remove("oculto");
  });
});

function mostrarFormulario() {
  document.getElementById("popup-bienvenida").style.display = "none";
  document.getElementById("formulario-perfil").classList.remove("oculto");
}

function finalizarRegistro() {
  localStorage.setItem("perfilCompleto", "true");
  document.getElementById("documentos-section").classList.add("oculto");
  document.getElementById("popup-final").classList.remove("oculto");
}
