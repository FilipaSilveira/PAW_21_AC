const Utilizadores = require("../models/utilizadores");
const IndexController = {};
IndexController.index=function(req,res){
    res.render('index', { title: 'Eventos Culturais' });
}
IndexController.login=function(req,res){
    res.render('login', { title: 'Iniciar sessao' });
    }

    IndexController.login2=function(req,res){
        //validacoes
        Utilizadores.findOne({email:req.body.email,password:req.body.password},(err,utilizador)=>{
            if(!utilizador){
                console.log("utilizador nao encontrado");
                res.render("login",{ title: 'Iniciar sessao' });
            }
            else{
                if(utilizador.tipo_utilizador=="cliente"){
                    console.log("cliente logado");
                    res.render("utilizador/index_utilizador",{title:"Utilizadores"});
                }
                else if(utilizador.tipo_utilizador=="promotor"){
                    console.log("promotor logado");
                    res.render("promotor/index_promotor", { title: "Promotores" });
                }
                else{
                    console.log("Admin logado");
                    res.render("admin/index_admin",{ title: "Admin" });
                }
            }
        })
    }
    IndexController.registar=function(req,res){
        res.render('registar', { title: 'Criar conta' });
    }
    IndexController.registar2=function(req,res){
        const { nome, email, password, nif,data_nascimento } = req.body;
        let errors = [];
      
        if (!nome || !email || !password || !nif || !data_nascimento ) {
          errors.push({ msg: 'Please enter all fields' });
        }
      
     /*   if (password != password2) {
          errors.push({ msg: 'Passwords do not match' });
        }
      */
        if (password.length < 6) {
          errors.push({ msg: 'Password must be at least 6 characters' });
        }
      
        if (errors.length > 0) {
          res.render('registar', {
            errors,
            nome,
            email,
            password,
            nif,
            data_nascimento
          });
        } else {
          Utilizadores.findOne({ email: email }).then(utilizador => {
            if (utilizador) {
              errors.push({ msg: 'Email already exists' });
              res.render('registar', {
                errors,
                nome,
                email,
                password,
                nif,
                data_nascimento
              });
            } else {
              const novoUtilizador = new Utilizadores({
                nome,
                email,
                password,
                nif,
                data_nascimento
              });
      
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(novoUtilizador.password, salt, (err, hash) => {
                  if (err) throw err;
                  novoUtilizador.password = hash;
                  novoUtilizador
                    .save()
                    .then(utilizador => {
                      req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                      );
                      res.redirect('/login');
                    })
                    .catch(err => console.log(err));
                });
              });
            }
          });
        }
      


       //validaçoes
  const cliente = {
    nome: req.body.nome,
    email: req.body.email,
    password: req.body.password,
    nif: req.body.nif,
    tipo_utilizador: "cliente",
    data_nascimento: req.body.data_nascimento,
  };
  const novo_cliente = new Utilizadores(cliente);
  novo_cliente.save();
  console.log(novo_cliente);
  console.log("Cliente registado com sucesso!");
  res.render("index", { title: "Eventos Culturais" });
}; 
    

module.exports =  IndexController;