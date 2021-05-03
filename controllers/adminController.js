const Utilizadores = require("../models/utilizadores");
const AdminController = {};
const bcrypt = require("bcryptjs");
AdminController.index = function (req, res, next) {
  res.render("admin/index_admin", { title: "Admin" });
};

AdminController.index_promotores = function (req, res, next) {
  res.render("admin/promotores/promotores");
};

AdminController.adicionar_promotores = function (req, res, next) {
  res.render("admin/promotores/adicionar_promotores");
};
AdminController.alterar_promotores = function (req, res, next) {
  Utilizadores.findOne({ nif: req.params.nif }, (err, promotor) => {
    if (err) {
      next(err);
    }
    res.render("admin/promotores/alterar_promotores", {promotor: promotor });
  })

};

AdminController.alterar_promotores2 = function (req, res, next) {
  Utilizadores.findOneAndUpdate({ _id: req.body._id }, {
    $set: {
      nome: req.body.nome,
      email: req.body.email,
      nif: req.body.nif,
      data_nascimento: req.body.data_nascimento
    }
  }, { new: true }, (err) => {
    if (err) {
      next(err);
    }
    res.render("admin/promotores/promotores");
  })

};

AdminController.remover_promotores = function (req, res, next) {
  Utilizadores.remove({ nif: req.params.nif }, (err) => {
    if (err) {
      next(err);
    }
    res.redirect("/admin/promotores/listar");
  });
}
AdminController.guardar_promotor = function (req, res, next) {
  //validaçoes
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(req.body.password,salt,(err,hash)=>{
      if(err) throw err;
      const promotor = {
        nome: req.body.nome,
        email: req.body.email,
        password: hash,
        nif: req.body.nif,
        tipo_utilizador: "promotor",
        data_nascimento: req.body.data_nascimento,
      };
      const novo_promotor = new Utilizadores(promotor);
      novo_promotor.save();
      console.log(novo_promotor);
      console.log("Promotor adicionado com sucesso!");
      res.render("admin/promotores/promotores");
    })
  })
  
};

AdminController.listar_promotores = function (req, res, next) {
  Utilizadores.find({ tipo_utilizador: "promotor" }, (err, promotores) => {
    if (err) {
      next(err);
    }
    console.log(promotores);
    res.render("admin/promotores/listar_promotores", {promotores: promotores });
  });
};


AdminController.index_utilizadores = function (req, res, next) {
  res.render("admin/utilizadores/utilizadores");
};

AdminController.remover_utilizadores = function (req, res, next) {
  Utilizadores.remove({ _id: req.params.id }, (err) => {
    if (err) {
      next(err);
    }
    res.redirect("/admin/utilizadores/listar");
  })
};



AdminController.listar_utilizadores = function (req, res, next) {
  Utilizadores.find({ tipo_utilizador: "cliente" }, (err, clientes) => {
    if (err) {
      next(err);
    }
    console.log(clientes);
    if (clientes.length == 0) {
      res.render("admin/utilizadores/utilizadores", { title: "Utilizadores" })
    }
    res.render("admin/utilizadores/listar_utilizadores", { title: "Utilizadores", clientes: clientes });
  });
};

AdminController.alterar_utilizadores = function (req, res, next) {
  Utilizadores.findOne({ _id: req.params.id }, (err, cliente) => {
    if (err) {
      next(err);
    }
    res.render("admin/utilizadores/alterar_utilizadores", { title: "Alterar Cliente", cliente: cliente });
  })

};

AdminController.guardar_utilizadores = function (req, res, next) {
  Utilizadores.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      nome: req.body.nome,
      email: req.body.email,
      password: req.body.password,
      nif: req.body.nif,
      data_nascimento: req.body.data_nascimento
    }
  }, { new: true }, (err) => {
    if (err) {
      next(err);
    }
    res.redirect("/admin/utilizadores/listar");
  })

};

AdminController.password = function (req, res, next) {
  Utilizadores.findOne({ tipo_utilizador: "admin" }, (err, admin) => {
    res.render("admin/alterar_password", { title: "Alterar Password Admin", admin: admin });
  })
}

AdminController.password2 = function (req, res, next) {
  const { password, nova_password, confirmar_nova_password } = req.body;
  let errors = [];

  if (!password || !nova_password || !confirmar_nova_password) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (nova_password.length < 6 || confirmar_nova_password.length <6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (nova_password != confirmar_nova_password) {
    errors.push({ msg: "Passwords do not match!" });
  }
  if (errors.length > 0) {
    res.render("admin/alterar_password", {
      errors,
      password,
      nova_password,
      confirmar_nova_password,
    });
  } else {
    Utilizadores.findOne({ tipo_utilizador: "admin" },(err,admin)=>
    {
      if(err){
        next(err);
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          bcrypt.compare(password, admin.password, (err, resultado) => {
           
            if (resultado) {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(nova_password, salt, (err, hash) => {
                  Utilizadores.findOneAndUpdate({ tipo_utilizador: "admin" }, { $set: { password: hash } }, { new: true }, (err) => {
                    if (err) {
                      next(err);
                    }
                    else {
                      console.log(req.body.nova_password);
                     
                      res.render("admin/index_admin");
                    }
                  })
                })
              })
            }
            else {
              errors.push({ msg: "Password atual errada!" });
              res.render("admin/alterar_password", {
                errors,
                password,
                nova_password,
                confirmar_nova_password
              });
            }

          })
        })
      })
    })
  }
}





 module.exports = AdminController;
