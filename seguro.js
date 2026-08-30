(function() {
  try {
    const detectDevTool = function() {
      const startTime = performance.now();
      debugger;
      const endTime = performance.now();
      if (endTime - startTime > 100) {
        document.body.innerHTML = '<div style="background:#111;color:#ff4444;height:100vh;display:flex;justify-content:center;align-items:center;font-family:sans-serif;font-size:22px;text-align:center;padding:20px;">Ops! O painel de inspeção foi detectado. Acesso restrito!</div>';
      }
    };
    setInterval(detectDevTool, 1000);
  } catch(e) {}

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

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
})();
