// Fortschrittsbalken-Animation
    let progress = 0;
    const progressBarFill = document.getElementById('progressBarFill');
    const loadingText = document.getElementById('loadingText');
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');

    function simulateLoading() {
      const interval = setInterval(() => {
        if (progress >= 100) {
          clearInterval(interval);
          loadingText.textContent = 'Fertig!';
          setTimeout(() => {
            loadingScreen.style.display = 'none'; // Ladebildschirm ausblenden
            mainContent.style.display = 'block'; // Hauptinhalt anzeigen
          }, 1000);
        } else {
          progress += 5;
          progressBarFill.style.width = progress + '%';
          loadingText.textContent = `Lädt... ${progress}%`;
        }
      }, 200);
    }

    // Ladeprozess starten
    window.onload = simulateLoading;
