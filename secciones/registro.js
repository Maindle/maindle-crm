
document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  localStorage.setItem("usuarioRegistrado", "true");

  alert("¡Registro exitoso! Ahora puedes acceder al Panel de Usuario.");
  window.location.href = "usuario.html";
});
