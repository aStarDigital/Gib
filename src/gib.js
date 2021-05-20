/*
    Gib.js Sketch/Playground
*/
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('gib-sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
};