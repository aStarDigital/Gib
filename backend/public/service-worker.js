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

self.addEventListener('paymentrequest', async e => {
  // handles a payment request coming from the gift card site. This is where we should handle the 
  // payment of the underlying site based off of the supplied information in e.methodData.
  // This will be triggered on new PaymentRequest(<args>).show() from Charlies site
  console.log("received payment request")
  console.log(e.methodData)

  // Preserve the event for future use
  payment_request_event = e;

  // Retain a promise for future resolution
  // Polyfill for PromiseResolver is provided below.
  resolver = new PromiseResolver();

  // Pass a promise that resolves when payment is done.
  e.respondWith(resolver.promise);

  console.log('complete payment here')
  const response = {
    methodName: "Gib",
  }
  resolver.resolve(response)
})

self.addEventListener('canmakepayment', async e => {
  // Handles the initialization of a new PaymentHandler. Here we can manage auth and supply or deny
  // Charlies site with access to the Gib payment functionality
  console.log('can make payment function called')
  console.log(e)
  //e.respondWith(Promise(true))
})
