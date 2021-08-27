# PayPal IFrame

Use the HTML file produced by this project to sandbox the PayPal Smart Buttons in an <iframe> element on your page.

There are a couple of reasons why you might want to do this:

  - Preventing the *PayPal SDK* from polluting the JavaScript namespace on your site.
  - Having the ability to change payment attributes, like the payment *currency* and *intent* (which as far as I can tell aren't possible once the JavaScript SDK has been loaded in the page).

# Usage

You can either use the pre-compiled HTML file under the *dist* directory in this repository or clone the repo and compile it for yourself by using the `yarn package` script.

Simply upload the static HTML file to any path under the *same domain name* as the page where your payment form will be shown, or else the browser won't permit access to the <iframe> element's content document.

Finally, here's some sample code that creates the <iframe>, adds it to the page, and sets up the *PayPal SDK* once it's loaded:

```javascript
const frameElement = document.createElement('iframe')
frameElement.src = '/path/to/paypal-iframe.html'
frameElement.frameBorder = 0
frameElement.addEventListener('load', () => {
  frameElement.contentWindow.loadPayPal({
    'client-id': 'your-client-id',
    'disable-funding': 'bancontact,blik,card,credit,eps,giropay,ideal,mybank,p24,sepa,sofort,venmo'
  }, {
    // Any options passed here will be forwarded to the `paypal.Buttons({ ... })` method.
  })
})

document.querySelector('#paypal-container').appendChild(frameElement)
```
