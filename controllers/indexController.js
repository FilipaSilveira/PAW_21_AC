const Utilizadores = require("../models/utilizadores");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const IndexController = {};
//Encaminhar o tipo de utilizador para a sua homePage

IndexController.dashboard = function (req, res) {


  
  if (req.user.tipo_utilizador == "admin") {
    res.render("admin/index_admin", {
      title: "Admin",
    });
  } else if (req.user.tipo_utilizador == "promotor") {
    res.render("promotor/index_promotor", { title: "Promotor" });
  } else {
    res.render("utilizador/index_utilizador", { title: "Cliente" });
  }
};

//Efectuar login

IndexController.login = function (req, res) {
  res.render("login", { title: "Iniciar sessao" });
};

IndexController.login2 = function (req, res, next) {
  
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

//Pagina de Registo

IndexController.registar = function (req, res) {
  res.render("registar", { title: "Criar conta" });
};

//Validar e guardar registo

IndexController.registar2 = function (req, res) {
  const { nome, email, password, nif, data_nascimento } = req.body;
  let errors = [];

  if (!nome || !email || !password || !nif || !data_nascimento) {
    errors.push({ msg: "Por favor preencha os campos todos!" });
  }


  if (password.length < 6) {
    errors.push({ msg: "Password tem de ter pelo menos 6 caracteres!" });
  }

  if (errors.length > 0) {
    res.render("registar", {
      errors,
      nome,
      email,
      password,
      nif,
      data_nascimento,
    });
  } else {
    Utilizadores.findOne({ email: email }).then((utilizador) => {
      if (utilizador) {
        errors.push({ msg: "Email ja existe" });
        res.render("registar", {
          errors,
          nome,
          email,
          password,
          nif,
          data_nascimento,
        });
      } else {
        const novoUtilizador = new Utilizadores({
          nome,
          email,
          password,
          nif,
          data_nascimento,
          tipo_utilizador: "cliente",
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(novoUtilizador.password, salt, (err, hash) => {
            if (err) throw err;
            novoUtilizador.password = hash;
            novoUtilizador
              .save()
              .then((utilizador) => {
                req.flash(
                  "success_msg",
                  "Está agora registado e pode fazer login!"
                );
                res.redirect("/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
};
IndexController.logout=function(req,res,next){
    req.logout();
    req.flash('success_msg', 'Terminou a Sessao');
    res.redirect('/login');
}

module.exports = IndexController;
