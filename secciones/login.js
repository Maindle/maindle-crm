document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Simulación de login exitoso
  const correo = document.querySelector('input[type="email"]').value;
  const pass = document.querySelector('input[type="password"]').value;

  if (correo && pass) {
    localStorage.setItem("usuarioRegistrado", "true");
    alert("Inicio de sesión exitoso. Bienvenido de nuevo.");
    window.location.href = "usuario.html";
  } else {
    alert("Por favor, completa todos los campos.");
  }
});
