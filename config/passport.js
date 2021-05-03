const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Utilizadores = require('../models/utilizadores');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      console.log(email);
      Utilizadores.findOne({
        email: email
      }).then(utilizador => {
        if (!utilizador) {
          return done(null, false, { message: 'That email is not registered' });
        }
        console.log("pass user"+utilizador.password);
        console.log("pass inserida"+password);
        // Match password
        bcrypt.compare(password, utilizador.password, (err, isMatch) => {
          console.log("result comparae"+isMatch);
          if (err){
            console.log(err);
            throw err;

          } 
          if (isMatch) {
            console.log("passwords correspondem");
            return done(null, utilizador);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(utilizador, done) {
    console.log("serializarrrrr"+utilizador);
    console.log("id do utilizador"+utilizador.id);
    done(null, utilizador.id);
  });

  passport.deserializeUser(function(id, done) {
    Utilizadores.findById(id, function(err, utilizador) {
      console.log("sdesertooooo"+utilizador);
      done(err, utilizador);
    });
  });
};