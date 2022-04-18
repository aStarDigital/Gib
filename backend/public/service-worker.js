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
})

self.addEventListener('canmakepayment', async e => {
  console.log('can make panemtn function called')
  console.log(e)
})
