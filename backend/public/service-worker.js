self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Installed');
});


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activated');
});

let payment_request_event;
let resolver;
let client;

class PromiseResolver {
  constructor() {
    this.promise_ = new Promise((resolve, reject) => {
      this.resolve_ = resolve; this.reject_ = reject;
    })
  }
  get promise() {
    return this.promise_
  }
  get resolve() {
    return this.resolve_
  }
  get reject() {
    return this.reject_
  }
}

// `self` is the global object in service worker
self.addEventListener('paymentrequest', async e => {
  console.log("received payment request")
  console.log(e.methodData)
  //if (payment_request_event) {
  // If there's an ongoing payment transaction, reject it.
  //resolver.reject();
  //}
  // Preserve the event for future use
  //payment_request_event = e;

  // Retain a promise for future resolution
  // Polyfill for PromiseResolver is provided below.
  //resolver = new PromiseResolver();

  // Pass a promise that resolves when payment is done.
  //e.respondWith(resolver.promise);
  // Open the checkout page.
  //try {
  //// Open the window and preserve the client
  //client = await e.openWindow(checkoutURL);
  //if (!client) {
  //// Reject if the window fails to open
  //throw 'Failed to open window';
  //}
  //} catch (err) {
  //// Reject the promise on failure
  //resolver.reject(err);
  //};

})
