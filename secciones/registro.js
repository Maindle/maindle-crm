document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Simular registro exitoso
  localStorage.setItem("usuarioRegistrado", "true");

  alert("¡Registro exitoso! Ahora puedes acceder al Panel de Usuario.");

  // Redirigir a /secciones/usuario.html
  window.location.href = "usuario.html";
});
