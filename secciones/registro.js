document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();
  localStorage.setItem("usuarioRegistrado", "true");
  localStorage.removeItem("perfilCompleto"); // aseguramos que aún no ha rellenado datos
  alert("¡Registro exitoso! Ahora completa tu perfil.");
  window.location.href = "usuario.html";
});
