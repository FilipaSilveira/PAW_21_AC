const UserController = {};

    UserController.login=function(req,res){
        res.render("login",{title:'Login'});
    }

module.exports = UserController;