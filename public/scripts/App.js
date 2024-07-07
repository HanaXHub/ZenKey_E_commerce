// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceworker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
      // Register synchronization
      registerSync();
    }).catch(function(error) {
      console.error('Service Worker registration failed:', error);
    });
}

// Function to register synchronization
function registerSync() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(function(registration) {
      return registration.sync.register('sync-signups');
    }).catch(function(err) {
      console.error('Unable to register sync event:', err);
    });
  }
}
