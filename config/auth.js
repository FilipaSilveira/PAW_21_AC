module.exports = {
    ensureAuthenticated: function(req, res, next) {
      console.log("entrou ensure")
      console.log("infofooo"+req.user);
      if (req.isAuthenticated()) {
        return next();
      }
      console.log("111111111111111");
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
      console.log("22222222222222222");
      if (!req.isAuthenticated()) {
        console.log("falhou");
        return next();
      }
      res.redirect('/dashboard');      
    }
  };