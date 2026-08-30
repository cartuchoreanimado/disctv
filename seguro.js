let userStatus = 'online';
let idleTimer;

function resetIdleTimer() {
  clearTimeout(idleTimer);
  if (userStatus === 'idle') {
    userStatus = 'online';
    updateMyStatus('online');
  }
  idleTimer = setTimeout(() => {
    userStatus = 'idle';
    updateMyStatus('idle');
  }, 120000);
}

['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, resetIdleTimer, { passive: true });
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    userStatus = 'idle';
    updateMyStatus('idle');
  } else {
    userStatus = 'online';
    updateMyStatus('online');
    resetIdleTimer();
  }
});

window.addEventListener('beforeunload', () => {
  updateMyStatus('offline');
});

function updateMyStatus(status) {
  if (!window.myName) return;
  const users = JSON.parse(localStorage.getItem('disctv_users') || '{}');
  if (users[window.myName]) {
    users[window.myName].status = status;
    localStorage.setItem('disctv_users', JSON.stringify(users));
  }
  const session = JSON.parse(localStorage.getItem('disctv_session') || '{}');
  if (session.name) {
    session.status = status;
    localStorage.setItem('disctv_session', JSON.stringify(session));
  }
  updateStatusDotsInUI();
}

function updateStatusDotsInUI() {
  const users = JSON.parse(localStorage.getItem('disctv_users') || '{}');
  document.querySelectorAll('[data-username]').forEach(el => {
    const username = el.getAttribute('data-username');
    const dot = el.querySelector('.status-dot');
    if (dot && users[username]) {
      const status = users[username].status || 'online';
      dot.style.backgroundColor = status === 'online' ? '#2ecc71' : status === 'idle' ? '#f1c40f' : '#95a5a6';
    }
  });
}

setInterval(updateStatusDotsInUI, 3000);

function safePlayAudio(audioElement) {
  if (document.hidden) {
    audioElement.pause();
    audioElement.currentTime = 0;
    return;
  }
  audioElement.currentTime = 0;
  audioElement.play().catch(() => {});
}
