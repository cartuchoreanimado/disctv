// Bloquear clique direito do mouse
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Bloquear atalhos de inspeção (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+C, Ctrl+U)
document.addEventListener('keydown', function(e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toUpperCase() === 'U')
  ) {
    e.preventDefault();
    return false;
  }
});