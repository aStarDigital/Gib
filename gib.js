/*
    Gib.js Sketch/Playground
*/

button1.addEventListener("click", () => {
  console.log("Clicked the button!");
})


let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

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