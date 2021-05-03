const Utilizadores = require("../models/utilizadores");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const IndexController = {};
//Encaminhar o tipo de utilizador para a sua homePage

IndexController.dashboard = function (req, res,next) {
  if (req.user.tipo_utilizador == "admin") {
    res.redirect("/admin");
  } else if (req.user.tipo_utilizador == "promotor") {
    res.redirect("/promotor");
  } else {
    res.redirect("/utilizador");
  }
};

//Mostra a pagina de  login

IndexController.login = function (req, res,next) {
  res.render("login");
};

//Efetuar login

IndexController.login2 = function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

//Pagina de Registo

IndexController.registar = function (req, res) {
  res.render("registar");
};

//Validar e guardar registo na base de dados

IndexController.registar2 = function (req, res,next) {
   //inserir validaçoes mais tarde
  const { nome, email, password, nif, data_nascimento } = req.body;
  let errors = [];
  //validaçoes
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
        //se as validaçoes correrem bem
      } else {
        const novoUtilizador = new Utilizadores({
          nome,
          email,
          password,
          nif,
          data_nascimento,
          tipo_utilizador: "cliente",
        });
        // geracao de uma hash da password para armazenar na base de dados
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

//Termino de Sessao e redirecionamento para a pagina de login

IndexController.logout=function(req,res,next){
    req.logout();
    req.flash('success_msg', 'Terminou a Sessao');
    res.redirect('/login');
}

module.exports = IndexController;
