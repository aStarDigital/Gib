/*
    Gib.js Extension Script
    This file is the WebMon AGENT that will invoke the WebMon Provider, which is a hosted service.
*/

button1.addEventListener("click", () => {
  console.log("Clicked the button!");
})

// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Yo!");
//   if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.register('pay/gib-sw.js').then(function(registration) {
//         // Registration was successful
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       }, function(err) {
//         // registration failed :(
//         console.log('ServiceWorker registration failed: ', err);
//       });
//   };
// })