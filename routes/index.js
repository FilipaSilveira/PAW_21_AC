var express = require('express');
var router = express.Router();
const {  ensureAuthenticated,forwardAuthenticated } = require('../config/auth');
const IndexController=require("../controllers/indexController");
//Pagina de login

router.get('/',forwardAuthenticated,IndexController.login);

//Validar login

router.post('/login',IndexController.login2);

//Reencaminhar diferentes tipos de utilziadores para as suas respectivas home pages

router.get('/dashboard', ensureAuthenticated, IndexController.dashboard);
  

//router.get('/login', forwardAuthenticated,IndexController.login);
  

//Pagina de registo

router.get('/registar', forwardAuthenticated,IndexController.registar);

//Valdiar Registo 

router.post('/registar',IndexController.registar2);

//Termino de Sessao

router.get('/logout',IndexController.logout);

module.exports = router;
