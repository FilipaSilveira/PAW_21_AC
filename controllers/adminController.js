const Utilizadores = require("../models/utilizadores");
const AdminController = {};
const bcrypt = require("bcryptjs");

//Mostra a pagina inicial do admin

AdminController.index = function (req, res, next) {
  res.render("admin/index_admin", { title: "Admin" });
};

//Mostra a pagina de gestao do promotores

AdminController.index_promotores = function (req, res, next) {
  res.render("admin/promotores/promotores");
};

//Mostra a pagina com o formulario para adicionar um promotor

AdminController.adicionar_promotores = function (req, res, next) {
  res.render("admin/promotores/adicionar_promotores");
};

//Mostra a pagina com o formulario para alterar dados do promotor

AdminController.alterar_promotores = function (req, res, next) {
  Utilizadores.findOne({ _id: req.params.id }, (err, promotor) => {
    if (err) {
      next(err);
    }
    res.render("admin/promotores/alterar_promotores", {promotor: promotor });
  })
};

//Guarda as alteraçoes do promotor na base de dados

AdminController.alterar_promotores2 = function (req, res, next) {
   //inserir validaçoes mais tarde
  Utilizadores.findOneAndUpdate({ _id: req.params.id }, {
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

//Remove um Promotor da base de dados

AdminController.remover_promotores = function (req, res, next) {
  Utilizadores.remove({ _id: req.params.id }, (err) => {
    if (err) {
      next(err);
    }
    res.redirect("/admin/promotores/listar");
  });
};

// Adiciona um promotor à base de dados

AdminController.guardar_promotor = function (req, res, next) {
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(req.body.password,salt,(err,hash)=>{
      if(err) next(err);
       //inserir validaçoes mais tarde
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
      console.log("Promotor adicionado com sucesso!");
      res.render("admin/promotores/promotores");
    })
  })
};

//Listagem de promotores existentes na base de dados

AdminController.listar_promotores = function (req, res, next) {
  Utilizadores.find({ tipo_utilizador: "promotor" }, (err, promotores) => {
    if (err) {
      next(err);
    }
    console.log(promotores);
    res.render("admin/promotores/listar_promotores", {promotores: promotores });
  });
};

//Pagina de gestao dos utilizadores

AdminController.index_utilizadores = function (req, res, next) {
  res.render("admin/utilizadores/utilizadores");
};

//Remove Utilizadores da base de dados

AdminController.remover_utilizadores = function (req, res, next) {
  Utilizadores.remove({ _id: req.params.id }, (err) => {
    if (err) {
      next(err);
    }
    res.redirect("/admin/utilizadores/listar");
  })
};

//Listagem de utilizadores existentes na base de dados

AdminController.listar_utilizadores = function (req, res, next) {
  Utilizadores.find({ tipo_utilizador: "cliente" }, (err, clientes) => {
    if (err) {
      next(err);
    }
    res.render("admin/utilizadores/listar_utilizadores", {clientes: clientes });
});
};

//Mostra a pagina do formulario para editar dados de um utilizador

AdminController.alterar_utilizadores = function (req, res, next) {
  Utilizadores.findOne({ _id: req.params.id }, (err, cliente) => {
    if (err) {
      next(err);
    }
    res.render("admin/utilizadores/alterar_utilizadores", {cliente: cliente });
  })

};

/////////////Nao sei se faz sentido o admin poder criar conta de utilizador!!//////////////


//Guarda na base de dados as alteraçoes feitas ao utilizador

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

//Mostra a pagina com o formulario para alterar a password do admin

AdminController.password = function (req, res, next) {
  Utilizadores.findOne({ tipo_utilizador: "admin" }, (err, admin) => {
    res.render("admin/alterar_password", { title: "Alterar Password Admin", admin: admin });
  })
}

// Altera, depois das validaçoes, a password do admin
AdminController.password2 = function (req, res, next) {
   //inserir validaçoes mais tarde
  const { password, nova_password, confirmar_nova_password } = req.body;
  let errors = [];
//verifica se os campos nao estao vazios
  if (!password || !nova_password || !confirmar_nova_password) {
    errors.push({ msg: "Por favor preencha os campos todos" });
  }
// password nao pode ter menos que 5 caracteres
  if (nova_password.length < 6 || confirmar_nova_password.length <5) {
    errors.push({ msg: "Password deve ter pelo menos 6 caracteres" });
  }
//verifica se as passwords correspondem uma com a outra
  if (nova_password != confirmar_nova_password) {
    errors.push({ msg: "Passwords nao correspondem!" });
  }
  //se falhar nas validaçoes a cima implementadas, mostra de novo a mesma pagina com a mensagem sobre o que falhou na validaçao
  if (errors.length > 0) {
    res.render("admin/alterar_password", {
      errors,
      password,
      nova_password,
      confirmar_nova_password,
    });
  } else {
    // se email e password estiverem corretos
    Utilizadores.findOne({ tipo_utilizador: "admin" },(err,admin)=>
    {
      if(err){
        next(err);
      }
      // comparar se as hashs da password atual inserida e da armazenada na base de dados sao iguais
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          bcrypt.compare(password, admin.password, (err, resultado) => {
           // se a comparaçao for validada
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
            //se a password atual inserida no input nao for igual à password guardada na base de dados
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
