const PromotorController = {};

    PromotorController.index=function(req,res){
        res.render("index_promotor",{title:'Promotor'});
    }

module.exports = PromotorController;