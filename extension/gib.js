/*
    Gib.js Extension Script
    This file is the WebMon AGENT that will invoke the WebMon Provider, which is a hosted service.
*/


navigator.serviceWorker.ready.then(registration => {
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
          expiry: String(expDate),
          data: link // The Gib link to be opened and associated with the payment stream.
        }
      }
    }
  };

  return new CustomEvent('custompaymentrequest', cprDetails);
}

// Use tabs.create() to create a new tab at the link URL.
//
async function getCurrentTab() {
  let queryOptions = {active: true, currentWindow: true};
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

const USER_ID = "8d3c7d79-d4b6-467f-a8f6-76292b368bdd"

function displayUrls(originalUrl, gibUrl) {
  $("#gibLink").text(gibUrl)
  $("#originalLink").text(originalUrl)
  $("#gibLinkSection").removeAttr("hidden")
}

async function generateGibUrl(url) {
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:4000/gib/link/",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      userId: USER_ID,
      linkUrl: url

    }),
    success: function (response) {
      displayUrls(url, response.redemptionUrl)
    },
    error: function (response) {
      console.error(response);
      return
    }
  });
}

$(document).ready(function () {
  $("#linkGenerate").click(async function () {
    tab = await getCurrentTab()
    const currentUrl = tab.url
    await generateGibUrl(currentUrl)
  });

  $("#copyLink").click(function () {
    var content = document.getElementById("gibLink").innerHTML;
    navigator.clipboard.writeText(content)
  });
});
