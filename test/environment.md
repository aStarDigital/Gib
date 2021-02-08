# Setting up a Gib test environment.

Gib needs to be a WM Provider in order to send funds to the creator's page on behalf of the receiver.

## Testing the receiver click-through flow.
Steps for a receiver to access WM content:
 - The user goes through a Gib link ("gib.app/asDF1234").
 - Gib redirects the user to the creator's site and appends a Gib querystring ("creator.com/content?gib=asDF1234").
    - If we skip shortlink generation and just append to the querystring when the sender generates the link, we can skip the redirect.
 - Gib.js on the creator's page appends document.monetization to the page and calls back to Gib, with the user's hash again, to start streaming payments to the creator's payment pointer.
 - Gib listens on a websockets connection or an ajax GET listener for when the user has stopped browsing the page and then stops paying.