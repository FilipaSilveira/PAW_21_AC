var express = require('express');
var router = express.Router();
var AdminController=require("../controllers/AdminController");
router.get('/', function(req, res, next) {
  AdminController.index(req,res,next);
});

router.get('/promotores', function(req, res, next) {
  AdminController.index_promotores(req,res,next);
});
router.get('/promotores/adicionar', function(req, res, next) {
  AdminController.adicionar_promotores(req,res,next);
});

router.post('/promotores/adicionar', function(req, res, next) {
  AdminController.guardar_promotor(req,res,next);
});

router.get('/promotores/listar', function(req, res, next) {
  AdminController.listar_promotores(req,res,next);
});

router.get('/promotores/alterar/:nif', function(req, res, next) {
  AdminController.alterar_promotores(req,res,next);
});

router.post('/promotores/alterar', function(req, res, next) {
  AdminController.alterar_promotores2(req,res,next);
});

router.get('/promotores/remover/:nif', function(req, res, next) {
  AdminController.remover_promotores(req,res,next);
});

module.exports = router;
