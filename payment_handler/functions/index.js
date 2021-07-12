const functions = require('firebase-functions');

exports.pay = functions.https.onRequest((req, res) => {
    // Validate the Gib card.
    // Match the card with a wallet.
    // Begin streaming payment to Charlie's pointer.
    console.log("Payment request ", req);
    res.status(200).send(); // Respond to  payment request.
})