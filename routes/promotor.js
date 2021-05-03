var express = require('express');
var router = express.Router();
var PromotorController=require("../controllers/PromotorController");
var multer  = require('multer');
var upload=multer({dest:'uploads/'});
//Index Promotores

router.get('/',PromotorController.index);

// Listar Locais de Espetaculo

router.get('/locais_espetaculos',PromotorController.locais_espetaculos);

//Adicionar Local de Espetaculo

router.get('/adicionar_local',PromotorController.adicionar_local);

router.post('/adicionar_local',PromotorController.guardar_local);

//Alterar locais de espetaculo

router.get('/alterar_local/:id',PromotorController.alterar_local);

router.post('/alterar_local/:id',PromotorController.atualizar_local);

//Remover Local de Espetaculo

router.get('/remover_local/:id',PromotorController.remover_local);




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Listar Eventos de um determinado Espetaculo

router.get('/eventos/:local',PromotorController.listar_eventos);

//Adicionar um evento

router.get('/eventos/adicionar_evento/:local',PromotorController.adicionar_evento);

router.post('/eventos/adicionar_evento/:local/:idPromotor',upload.single('poster'),PromotorController.guardar_evento);

//Alterar um evento 

router.get('/eventos/alterar_evento/:local/:id_evento',PromotorController.alterar_evento);

router.post('/eventos/alterar_evento/:local/:id_evento',PromotorController.atualizar_evento);

//Remover um evento

router.get('/eventos/remover_evento/:local/:id_evento',PromotorController.remover_evento);

//Apresentar o poster do evento

//Nao esta a funcionar corretamente 

router.get('/uploads/:filename',PromotorController.poster);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





router.get('/bilhetes',PromotorController.bilhetes);


module.exports = router;
