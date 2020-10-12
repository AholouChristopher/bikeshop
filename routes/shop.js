var express = require('express');
var router = express.Router();


const stripe = require('stripe')('sk_test_51HAanVBON2ZKPascsc8M2k1BiwKUy90mFwKTdHD9glGYAgzjItAna1VlR4P9BssWSDgxeFT8yhQir6eW1pq7tr7c00VLjucaxn');



router.get('/AppDB', async function(req, res, next) {
  var boolen = true;
  if ( req.session.dataCardBike == undefined){
    req.session.dataCardBike=[];
  }

  for (var i = 0; i < req.session.dataCardBike.length; i++){
    if (req.session.dataCardBike[i].nom == req.query.nom ){
      req.session.dataCardBike[i].quantity = Number(req.session.dataCardBike[i].quantity) + 1;
      boolen = false;
    }
  }


if( boolen == true ){
  req.session.dataCardBike.push({
    nom: req.query.nom,
    src: req.query.src,
    prix: req.query.prix,
    quantity: req.query.quantity,
  });
}


var stripeCard = [];

for (var i = 0; i < req.session.dataCardBike.length;i++){
  stripeCard.push({
    price_data: {
      currency: 'eur',
      product_data: {
        name: req.session.dataCardBike[i].nom,
      },
      unit_amount: req.session.dataCardBike[i].prix *100 ,
    },
    quantity:  req.session.dataCardBike[i].quantity,
  });
}


var sessionStripeID;

if (stripeCard.length > 0){
var session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: stripeCard,
  mode: 'payment',
  success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'http://localhost:3000/shop/cancel',
});

sessionStripeID = session.id;

}











/*
var stripeCard = [];
for (var i = 0; i < req.session.dataCardBike.length;i++){
  stripeCard.push({
    name: req.session.dataCardBike.nom,
    amount: req.session.dataCardBike.prix *100,
    currency: 'eur',
    quantity:  req.session.dataCardBike.quantity,
  });
}

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: stripeCard,
    success_url: 'https://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://localhost:3000/cancel',
});
var stripeCard = [];

for (var i = 0; i < req.session.dataCardBike.length;i++){
  stripeCard.push({
    name: req.session.dataCardBike.nom,
    amount: req.session.dataCardBike.prix *100,
    currency: 'eur',
    quantity:  req.session.dataCardBike.quantity,
  });
}

    var sessionStripeID;
    sessionStripeID = session.id;



*/

res.render('shop',{dataCardBike: req.session.dataCardBike, totalPanier:null, fdp:35, sessionStripeID});
});



router.get('/delete-shop', async function(req, res, next) {
  req.session.dataCardBike.splice(req.query.countRemove,1);
  var stripeCard = [];

  for (var i = 0; i < req.session.dataCardBike.length;i++){
    stripeCard.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: req.session.dataCardBike[i].nom,
        },
        unit_amount: req.session.dataCardBike[i].prix *100 ,
      },
      quantity:  req.session.dataCardBike[i].quantity,
    });
  }


  var sessionStripeID;

  if (stripeCard.length > 0){
  var session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: stripeCard,
    mode: 'payment',
    success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/shop/cancel',
  });

  sessionStripeID = session.id;

  }
  res.render('shop',{dataCardBike:req.session.dataCardBike, totalPanier:null, sessionStripeID});

});

router.get('/cancel', async function(req, res, next){
  var stripeCard = [];

  for (var i = 0; i < req.session.dataCardBike.length;i++){
    stripeCard.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: req.session.dataCardBike[i].nom,
        },
        unit_amount: req.session.dataCardBike[i].prix *100 ,
      },
      quantity:  req.session.dataCardBike[i].quantity,
    });
  }


  var sessionStripeID;

  if (stripeCard.length > 0){
  var session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: stripeCard,
    mode: 'payment',
    success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/shop/cancel',
  });

  sessionStripeID = session.id;

  }

  res.render('shop',{dataCardBike: req.session.dataCardBike, totalPanier:null, sessionStripeID}
);

});
module.exports = router;
