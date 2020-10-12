
var stripe = Stripe('pk_test_51HAanVBON2ZKPascTFtAqG0Uu0ElI1EAOM1ifWtrxSDV5x1uKmzixnwcOWFuHFdfZmxbUYbrbTkhKlyCIXXsrOlf00wzSwZL07');
var checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener("click", function() {
    stripe.redirectToCheckout({
      sessionId: sessionStripeID
    }).then(function (result) {

    });
  });
