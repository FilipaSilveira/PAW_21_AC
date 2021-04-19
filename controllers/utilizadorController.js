const UtilizadorController = {};

UtilizadorController.index=function(req,res){
        res.render("index_utilizador",{title:'Utilizador'});
    }

module.exports = UtilizadorController;