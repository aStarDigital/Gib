function usePaymentRequest() {
  var supportedInstruments = [{
    supportedMethods: 'http://localhost:4000/public'
  }];

  var details = {
    total: {label: 'Donation', amount: {currency: 'USD', value: '65.00'}},
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {currency: 'USD', value: '65.00'}
      }
    ],
  };

  var options = {requestShipping: false};

  var request = new PaymentRequest(supportedInstruments, details, options);
  // Add event listeners here.
  // Call show() to trigger the browser's payment flow.
  request.show().then(function (instrumentResponse) {
    // Do something with the response from the UI.
    console.log('askldfj')
  }).catch(function (err) {
    // Do something with the error from request.show().
  });
}
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

function hideCover() {
  $("#premium-cover").attr("hidden", 'true')
}

async function streamPayment(linkId) {
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:4000/gib/link/" + linkId + "/stream",
    contentType: "application/json",
    data: JSON.stringify({
      receiverAddress: "http://localhost:7770/accounts/charlie/spsp"
    }),
  }).done(function (data) {
    hideCover();

  }).fail(function () {
  }).always(function () {
  });
}

$(document).ready(function () {
  const linkId = getUrlParameter("linkId")
  if (linkId) {
    streamPayment(linkId)
  }
});
