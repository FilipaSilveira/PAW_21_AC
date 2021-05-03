const UtilizadorController = {};

//Mostra a pagina inicial do utilizador
// Funcionalidades dos utilizadores incompletas.acabar 2 parte
UtilizadorController.index=function(req,res,next){
        res.render("utilizador/index_utilizador",{title:'Utilizador'});
    };
module.exports = UtilizadorController;