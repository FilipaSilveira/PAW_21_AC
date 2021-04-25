var express = require('express');
var router = express.Router();
const IndexController=require("../controllers/indexController");
/* GET home page. */
router.get('/', function(req, res, next) {
  IndexController.index(req,res,next);
});

router.get('/login', function(req, res, next) {
  IndexController.login(req,res,next);
  
});

router.post('/login', function(req, res, next) {
  IndexController.login2(req,res,next);
  
});
router.get('/registar', function(req, res, next) {
  IndexController.registar(req,res,next);
 
});



router.post('/registar', function(req, res, next) {
  IndexController.registar2(req,res,next);
});

 /*router.get('/teste', function(req, res, next) {
  let date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);

let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

let year = date_ob.getFullYear();

let hours = date_ob.getHours();

let minutes = date_ob.getMinutes();

let seconds = date_ob.getSeconds();
// prints date in YYYY-MM-DD format
//console.log(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
//console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

  const bilhete={
    teste_covid:"negativo",
    id_cliente:123,
    codigo_evento:456,
    data_reserva:(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds),
    codigo_bilhete:12345
  }
  const novo_bilhete=new Bilhetes(bilhete);
  novo_bilhete.save();
  res.send(bilhete);  
  Bilhetes.findOne({teste_covid:"negativo"},function(err,result){
    console.log(result);
    res.send(bilhete);    
  })
}); */

module.exports = router;
