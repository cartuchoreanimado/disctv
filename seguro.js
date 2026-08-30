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
  renderDots();
}

function renderDots() {
  const users = JSON.parse(localStorage.getItem('disctv_users') || '{}');
  
  document.querySelectorAll('img, .avatar, [style*="border-radius: 50%"]').forEach(img => {
    let container = img.closest('.user-item, .member, .friend, [data-username], .profile-container');
    if (!container && img.parentElement) {
      container = img.parentElement;
      if (getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
      }
    }
    if (!container) return;

    let username = container.getAttribute('data-username');
    if (!username) {
      const textEl = container.querySelector('.username, span, p');
      if (textEl) username = textEl.textContent.trim();
    }
    if (!username && window.myName && container.innerHTML.includes(window.myName)) {
      username = window.myName;
    }

    if (username && users[username]) {
      let dot = container.querySelector('.auto-status-dot');
      if (!dot) {
        dot = document.createElement('div');
        dot.className = 'auto-status-dot';
        dot.style.position = 'absolute';
        dot.style.bottom = '2px';
        dot.style.right = '2px';
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.borderRadius = '50%';
        dot.style.border = '2px solid #2f3136';
        dot.style.zIndex = '10';
        container.style.position = 'relative';
        container.appendChild(dot);
      }
      const st = users[username].status || 'online';
      dot.style.backgroundColor = st === 'online' ? '#2ecc71' : st === 'idle' ? '#f1c40f' : '#747f8d';
    }
  });
}

setInterval(renderDots, 1500);

function safePlayAudio(audioElement) {
  if (document.hidden) {
    audioElement.pause();
    audioElement.currentTime = 0;
    return;
  }
  audioElement.currentTime = 0;
  audioElement.play().catch(() => {});
}
