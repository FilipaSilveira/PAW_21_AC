var express = require('express');
var router = express.Router();
var UtilizadorController=require("../controllers/utilizadorController");
/* GET users listing. */
router.get('/', function(req, res, next) {
  UtilizadorController.index(req,res,next);
});

module.exports = router;
