var express = require('express');
var router = express.Router();
var AdminController=require("../controllers/AdminController");
router.get('/', function(req, res, next) {
  AdminController.index(req,res,next);
});

module.exports = router;
