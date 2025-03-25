function toggleSubmenu(id) {
  const submenu = document.getElementById(`submenu-${id}`);
  if (submenu) {
    submenu.classList.toggle('oculto');
  }
}
