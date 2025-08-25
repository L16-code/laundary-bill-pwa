// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        // Check if the app can be installed (for install button functionality)
        let deferredPrompt;
        const installPrompt = document.getElementById('installPrompt');
        const installBtn = document.getElementById('installBtn');
        
        window.addEventListener('beforeinstallprompt', (e) => {
          // Prevent Chrome 67 and earlier from automatically showing the prompt
          e.preventDefault();
          // Stash the event so it can be triggered later
          deferredPrompt = e;
          // Show the install button
          if (installPrompt) installPrompt.classList.add('show');
          
          // Install button click handler
          if (installBtn) {
            installBtn.addEventListener('click', () => {
              // Hide the app provided install prompt
              installPrompt.classList.remove('show');
              // Show the install prompt
              deferredPrompt.prompt();
              // Wait for the user to respond to the prompt
              deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                  console.log('User accepted the install prompt');
                } else {
                  console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
              });
            });
          }
        });
      })
      .catch(error => {
        console.error('ServiceWorker registration failed: ', error);
      });
  });
}
