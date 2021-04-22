const PromotorController = {};

    PromotorController.index=function(req,res){
        res.render("promotor/index_promotor",{title:'Promotor'});
    }

module.exports = PromotorController;