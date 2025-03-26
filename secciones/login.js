document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  localStorage.setItem("usuarioRegistrado", "true");
  alert("¡Bienvenido a Maindle!");
  window.location.href = "usuario.html";
});
