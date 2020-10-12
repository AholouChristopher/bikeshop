var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{dataBike});
});
var dataBike=[
  {nom :"BIKO45",src:"images/bike-1.jpg",prix:"679"},
  {nom :"ZOOK7",src:"images/bike-2.jpg",prix:"799"},
  {nom :"LIKO89",src:"images/bike-3.jpg",prix:"839"},
  {nom :"GEVVO8",src:"images/bike-4.jpg",prix:"1249"},
  {nom :"KIVVIT ",src:"images/bike-5.jpg",prix:"899€"},
  {nom :"NASAY ",src:"images/bike-6.jpg",prix:"1399"},
];


router.get('/success', function(req, res, next){
  res.render('confirm');
});




module.exports = router;
