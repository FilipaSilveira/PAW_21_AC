const IndexController = {};

IndexController.login=function(req,res){
        res.render("login",{title:'Login'});
    }

module.exports =  IndexController;