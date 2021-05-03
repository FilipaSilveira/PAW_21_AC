const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Utilizadores = require('../models/utilizadores');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      //Procura se existe o email
      Utilizadores.findOne({
        email: email
      }).then(utilizador => {
        if (!utilizador) {
          return done(null, false, { message: 'Email nao esta registado' });
        }
        // se existir verifica se a password é a correta
        bcrypt.compare(password, utilizador.password, (err, isMatch) => {
          if (err){
            console.log(err);
            throw err;

          } 
          if (isMatch) {
            return done(null, utilizador);
          } else {
            return done(null, false, { message: 'Password incorreta' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(utilizador, done) {
    done(null, utilizador.id);
  });

  passport.deserializeUser(function(id, done) {
    Utilizadores.findById(id, function(err, utilizador) {
      done(err, utilizador);
    });
  });
};