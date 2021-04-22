const UtilizadorController = {};

UtilizadorController.index=function(req,res){
        res.render("utilizador/index_utilizador",{title:'Utilizador'});
    }

module.exports = UtilizadorController;