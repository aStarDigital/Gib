let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

/**
 * As a persistent service worker, this file should(?) handle sending PaymentRequests and doing all the serviceworker stuff rather than gib-sw.js. See below.
 * 
 */

//  self.addEventListener("install", event => {
//   const preCache = async () => {
//       const cache = await caches.open('gib-static-v1');
//       return cache.addAll([
//         '/',
//       ]);
//   };
//   event.waitUntil(preCache());
// })

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//             console.log('cache hit!');
//           return response;
//         }
//         console.log('still fetched ', event.request);
//         return fetch(event.request);
//       }
//     )
//   );
// });