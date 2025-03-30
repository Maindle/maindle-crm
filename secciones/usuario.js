
window.onload = () => {
    const registrado = localStorage.getItem("usuarioRegistrado");
    if (registrado !== "true") {
        window.location.href = "registro.html";
    } else {
        document.getElementById("popup-inicial").classList.remove("oculto");
    }
};

function cerrarPopup() {
    document.getElementById("popup-inicial").classList.add("oculto");
}
function abrirFormulario() {
    cerrarPopup();
    document.getElementById("formulario-perfil").classList.remove("oculto");
}
function abrirDocumentos() {
    document.getElementById("formulario-perfil").classList.add("oculto");
    document.getElementById("documentos-popup").classList.remove("oculto");
}
function finalizarRegistro() {
    alert("Documentación enviada correctamente.");
    document.getElementById("documentos-popup").classList.add("oculto");
}
function toggleSubMenu(id) {
    const submenu = document.getElementById(id);
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}
function verSeccion(nombre) {
    alert("Accediendo a sección: " + nombre);
}
