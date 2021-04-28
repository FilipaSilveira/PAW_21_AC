var express = require('express');
var router = express.Router();
var AdminController=require("../controllers/AdminController");
router.get('/', function(req, res, next) {
  AdminController.index(req,res,next);
});

router.get('/promotores',AdminController.index_promotores);

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

router.get('/utilizadores', function(req, res, next) {
  AdminController.index_utilizadores(req,res,next);
});

router.get('/utilizadores/listar', function(req, res, next) {
  AdminController.listar_utilizadores(req,res,next);
});

router.get('/promotores/alterar/:nif', function(req, res, next) {
  AdminController.alterar_utilizadores(req,res,next);
});


router.post('/utilizadores/alterar', function(req, res, next) {
  AdminController.alterar_utilizadores2(req,res,next);
});

router.get('/password', function(req, res, next) {
  AdminController.password(req,res,next);
});

router.post('/password', function(req, res, next) {
  AdminController.password2(req,res,next);
});

module.exports = router;
