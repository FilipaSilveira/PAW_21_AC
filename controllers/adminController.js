const Utilizadores = require("../models/utilizadores");

const AdminController = {};

AdminController.index = function (req, res, next) {
  res.render("admin/index_admin", { title: "Admin" });
};

AdminController.index_promotores = function (req, res, next) {
  res.render("admin/promotores/promotores", { title: "Promotores" });
};

AdminController.adicionar_promotores = function (req, res, next) {
  res.render("admin/promotores/adicionar_promotores", { title: "Adicionar Promotores" });
};
AdminController.alterar_promotores = function (req, res, next) {
    Utilizadores.findOne({nif:req.params.nif},(err,promotor)=>{
        if(err){
            next(err);
        }
        res.render("admin/promotores/alterar_promotores", {title:"Alterar Promotor", promotor: promotor });
    })
  
};

AdminController.alterar_promotores2 = function (req, res, next) {
    Utilizadores.findOneAndUpdate({_id:req.body._id},{$set:{nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
        nif: req.body.nif,
        data_nascimento: req.body.data_nascimento}},{new:true},(err)=>{
        if(err){
            next(err);
        }
        res.render("admin/promotores/promotores", {title:"Promotores"});
    })
  
};

AdminController.remover_promotores = function (req, res, next) {
    Utilizadores.remove({nif:req.params.nif},(err)=>{
        if(err){
            next(err);
        }
        Utilizadores.find({}, (err, promotores) => {
            if (err) {
              next(err);
            }
            console.log(promotores);
            res.render("admin/promotores/listar_promotores", {title:"Promotores", promotores: promotores });
    })
});
}
AdminController.guardar_promotor = function (req, res, next) {
  //validaçoes
  const promotor = {
    nome: req.body.nome,
    email: req.body.email,
    password: req.body.password,
    nif: req.body.nif,
    tipo_utilizador: "promotor",
    data_nascimento: req.body.data_nascimento,
  };
  const novo_promotor = new Utilizadores(promotor);
  novo_promotor.save();
  console.log(novo_promotor);
  console.log("Promotor adicionado com sucesso!");
  res.render("admin/promotores/promotores", { title: "Promotores" });
};

AdminController.listar_promotores = function (req, res, next) {
  Utilizadores.find({tipo_utilizador:"promotor"}, (err, promotores) => {
    if (err) {
      next(err);
    }
    console.log(promotores);
    res.render("admin/promotores/listar_promotores", {title:"Promotores", promotores: promotores });
  });
};


AdminController.index_utilizadores = function (req, res, next) {
  res.render("admin/utilizadores/utilizadores", { title: "Utilizadores" });
};


AdminController.listar_utilizadores = function (req, res, next) {
  Utilizadores.find({tipo_utilizador:"cliente"}, (err, clientes) => {
    if (err) {
      next(err);
    }
    console.log(clientes);
    if(clientes.length==0){
      res.render("admin/utilizadores/utilizadores",{title:"Utilizadores"})
    }
    res.render("admin/utilizadores/listar_utilizadores", {title:"Utilizadores", clientes: clientes });
  });
};

AdminController.alterar_utilizadores = function (req, res, next) {
  Utilizadores.findOne({nif:req.params.nif},(err,cliente)=>{
      if(err){
          next(err);
      }
      res.render("admin/utilizadores/alterar_utilizadores", {title:"Alterar Cliente", cliente: cliente });
  })

};

AdminController.alterar_utilizadores2 = function (req, res, next) {
  Utilizadores.findOneAndUpdate({_id:req.body._id},{$set:{nome: req.body.nome,
      email: req.body.email,
      password: req.body.password,
      nif: req.body.nif,
      data_nascimento: req.body.data_nascimento}},{new:true},(err)=>{
      if(err){
          next(err);
      }
      res.render("admin/utilizadores/utilizadores", {title:"Utilizadores"});
  })

};

AdminController.password = function(req, res, next) {
  Utilizadores.findOne({tipo_utilizador:"admin"},(err,admin)=>{
    res.render("admin/alterar_password",{title:"Alterar Password Admin", admin:admin});
  })
}

AdminController.password2 = function(req, res, next) {
  Utilizadores.findOneAndUpdate({tipo_utilizador:"admin"},{$set:{password:req.body.nova_password}},{new:true},(err)=>{
    if(err){
      next(err);
    }
    else{
      console.log(req.body.nova_password);
      res.render("admin/index_admin",{title:"Admin"});
    }
  })
};




module.exports = AdminController;
