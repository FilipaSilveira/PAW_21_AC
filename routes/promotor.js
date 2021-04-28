var express = require('express');
var router = express.Router();
var PromotorController=require("../controllers/PromotorController");
router.get('/', function(req, res, next) {
    PromotorController.index(req,res,next);
});

router.get('/locais_espetaculos', function(req, res, next) {
    PromotorController.locais_espetaculos(req,res,next);
});

router.get('/adicionar_local', function(req, res, next) {
    PromotorController.adicionar_local(req,res,next);
});

router.post('/adicionar_local', function(req, res, next) {
    PromotorController.guardar_local(req,res,next);
});

router.get('/alterar_local/:id', function(req, res, next) {
    PromotorController.alterar_local(req,res,next);
});

router.post('/alterar_local/:id', function(req, res, next) {
    PromotorController.atualizar_local(req,res,next);
});
router.get('/remover_local/:id', function(req, res, next) {
    PromotorController.remover_local(req,res,next);
});


router.get('/eventos', function(req, res, next) {
    PromotorController.eventos(req,res,next);
});

router.get('/eventos/:local', function(req, res, next) {
    PromotorController.listar_eventos(req,res,next);
});

router.get('/eventos/alterar_evento/:local/:id_evento', function(req, res, next) {
    PromotorController.alterar_evento(req,res,next);
});
router.post('/eventos/alterar_evento/:local/:id_evento', function(req, res, next) {
    PromotorController.atualizar_evento(req,res,next);
});

router.get('/eventos/remover_evento/:local/:id_evento', function(req, res, next) {
    PromotorController.remover_evento(req,res,next);
});

router.get('/eventos/adicionar_evento/:local', function(req, res, next) {
    PromotorController.adicionar_evento(req,res,next);
});

router.post('/eventos/adicionar_evento/:local/:idPromotor', function(req, res, next) {
    PromotorController.guardar_evento(req,res,next);
});



router.get('/bilhetes', function(req, res, next) {
    PromotorController.bilhetes(req,res,next);
});


module.exports = router;
