/*
    Gib.js Extension Script
    This file is the WebMon AGENT that will invoke the WebMon Provider, which is a hosted service.
*/

navigator.serviceWorker.ready.then( registration => {
  try {
    registration.paymentManager;
    if (!registration.paymentManager) {
      throw new Error("Payment Manager not available.\nVisit chrome://flags and enable #service-worker-payment-apps.");
    };
  
    // Setting the instrument is not working/necessary at this stage in the project.
    registration.paymentManager.instruments.set(
      "Gib Payment Handler", // Payment Instrument Key
      { // Payment Instrument Details
        name: "Pay With Gib",
        method: "https://gib-app-1c49c.web.app/pay" // Should this be "monetization"?
      }
    );

    console.log("Successfully set payment instrument: ", registration.paymentManager.instruments);
  
  } catch (e) {
    console.error("Unable to register payment instrument.\n", e);
  }

  // On input submit, dispatch payment request event with link from form.
  const input = document.getElementById("linkInput");
  document.getElementById("linkSubmit").addEventListener('click', (e) => {
    const request = createPaymentRequestEvent("my-payment-pointer", input.value);
    registration.dispatchEvent(request);
  })
})

function createPaymentRequestEvent(pointer, link) {
  const expDate = new Date();
  expDate.setFullYear(expDate.getFullYear() + 2);

  const cprDetails = {
    detail: {
      methodData: {
        supportedMethods: "https://gib-app-1c49c.web.app/pay", // Should this be "monetization"?
        data: {
          destination: pointer,
          condition: "qwerty1234", // Need more background re: ILP conditions.
          expiry:  String(expDate),
          data: link // The Gib link to be opened and associated with the payment stream.
        }
      }
    }
  };

  return new CustomEvent('custompaymentrequest', cprDetails);
}

// Use tabs.create() to create a new tab at the link URL.