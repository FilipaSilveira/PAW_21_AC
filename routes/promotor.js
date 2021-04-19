var express = require('express');
var router = express.Router();
var PromotorController=require("../controllers/PromotorController");
router.get('/', function(req, res, next) {
    PromotorController.index(req,res,next);
});

module.exports = router;
