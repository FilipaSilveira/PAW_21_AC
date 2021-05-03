var express = require('express');
var router = express.Router();
var AdminController=require("../controllers/AdminController");


//Index admin

router.get('/',AdminController.index);

// index Promotores

router.get('/promotores',AdminController.index_promotores);

//Adicionar Promotores

router.get('/promotores/adicionar',AdminController.adicionar_promotores);

router.post('/promotores/adicionar',AdminController.guardar_promotor);


//Listar Promonores

router.get('/promotores/listar',AdminController.listar_promotores);

//Alterar Promotores

router.get('/promotores/alterar/:nif',AdminController.alterar_promotores);

router.post('/promotores/alterar',AdminController.alterar_promotores2);

//Remover Promotores

router.get('/promotores/remover/:nif',AdminController.remover_promotores);



//////////////////////////////////////////////////////////////////////////////////////////////////


//Index Utilizadores

router.get('/utilizadores',AdminController.index_utilizadores);

//Listar Utilizadores

router.get('/utilizadores/listar',AdminController.listar_utilizadores);

//Alterar Utilizadores

router.get('/utilizadores/alterar/:id',AdminController.alterar_utilizadores);

router.post('/utilizadores/alterar/:id',AdminController.guardar_utilizadores);

//Remover Utilizadores

router.get('/utilizadores/remover/:id',AdminController.remover_utilizadores);



/////////////////////////////////////////////////////////////////////////////////////////////////


//Alterar password admin

router.get('/password',AdminController.password);

router.post('/password',AdminController.password2);

module.exports = router;
