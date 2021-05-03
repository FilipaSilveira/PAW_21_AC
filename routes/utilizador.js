var express = require('express');
var router = express.Router();
var UtilizadorController=require("../controllers/utilizadorController");

//Index Utilizador

router.get('/',UtilizadorController.index);


module.exports = router;
