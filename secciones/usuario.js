
document.addEventListener("DOMContentLoaded", () => {
    const registrado = localStorage.getItem("usuarioRegistrado") === "true";
    const perfilCompleto = localStorage.getItem("perfilCompleto") === "true";

    if (registrado && !perfilCompleto) {
        document.getElementById("popup-bienvenida").classList.remove("oculto");
    } else if (perfilCompleto) {
        document.getElementById("popup-final").classList.remove("oculto");
    }

    document.getElementById("completarPerfilBtn").addEventListener("click", () => {
        document.getElementById("popup-bienvenida").classList.add("oculto");
        document.getElementById("formulario-perfil").classList.remove("oculto");
    });

    document.getElementById("formPerfil").addEventListener("submit", function(e) {
        e.preventDefault();
        localStorage.setItem("datosPerfil", JSON.stringify({
            nombre: this.nombre.value,
            apellidos: this.apellidos.value,
            usuario: this.usuario.value,
            pais: this.pais.value,
            direccion: this.direccion.value,
            tin: this.tin.value
        }));
        document.getElementById("formulario-perfil").classList.add("oculto");
        document.getElementById("documentos-section").classList.remove("oculto");
    });

    document.getElementById("finalizarRegistro").addEventListener("click", () => {
        localStorage.setItem("perfilCompleto", "true");
        document.getElementById("documentos-section").classList.add("oculto");
        document.getElementById("popup-final").classList.remove("oculto");
    });
});
