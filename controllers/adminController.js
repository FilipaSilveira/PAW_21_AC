const AdminController = {};

AdminController.index=function(req,res,next){
        res.render("index_admin",{title:'Admin'});
    }

module.exports = AdminController;