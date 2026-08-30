
window.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) || 
        (e.ctrlKey && e.key === 'U')
    ) {
        e.preventDefault();
        alert("IXIIIII voce pelo visto tentou invadir ne");
    }
});



function safePlayAudio(audioElement) { 
    if (document.hidden) { 
        audioElement.pause(); 
        audioElement.currentTime = 0; 
        return; 
    } 
    audioElement.currentTime = 0; 
    audioElement.play().catch(() => {}); 
}
