const Locais = require("../models/locais");
const Eventos=require("../models/eventos");
const PromotorController = {};

//Mostra a pagina incial do Promotor

PromotorController.index = function (req, res, next) {
  res.render("promotor/index_promotor",);
};

//Listagem dos locais de espetaculos inseridos pelo promotor

PromotorController.locais_espetaculos = function (req, res) {
  Locais.find({id_promotor:req.user._id}, (err, locais) => {
    if (err) {
      next(err);
    }
    res.render("promotor/locais_espetaculos", {
      locais: locais,
    });
  });
};

//Mostra a pagina com o formulario para adicionar um local de espetaculos

PromotorController.adicionar_local = function (req, res, next) {
  res.render("promotor/adicionar_local");
};

//Guarda na base da dados o local de espetaculos inserido

PromotorController.guardar_local = function (req, res, next) {
   //inserir validaçoes mais tarde

  let cod_aleatorio = Math.floor(Math.random() * 10000 + 1);
  let data = new Date();
  let ano = data.getFullYear();
  let mes = ("0" + (data.getMonth() + 1)).slice(-2);
  let dia=("0" + data.getDate()).slice(-2);
  let hora = data.getHours();
  let minuto = data.getMinutes();
  let segundo = data.getSeconds();
  let codigo_local = ano + mes + dia + hora + minuto + segundo + cod_aleatorio;
  const local = {
    morada: req.body.morada,
    lotacao: req.body.lotacao,
    limitacao_lotacao: req.body.limitacao_lotacao,
    codigo: codigo_local,
    id_promotor:req.user._id
  };
  const novo_local = new Locais(local);
  novo_local.save();
  console.log("Local adicionado com sucesso!");
  res.redirect("/promotor/locais_espetaculos");
  
};

//Mostra a pagina com o formulario para alterar dados referentes a um local de espetaculos

PromotorController.alterar_local = function (req, res, next) {
  Locais.findOne({_id:req.params.id},(err,local)=>{
    if(err){
      next(err);
    }
    res.render("promotor/alterar_local", { local:local });
  }) 
};

//Guarda na base de dados as alteraçoes efectudas

PromotorController.atualizar_local = function (req, res, next) {
  Locais.findOneAndUpdate({_id:req.params.id},{$set:{morada: req.body.morada,
    lotacao: req.body.lotacao,
    limitacao_lotacao: req.body.limitacao_lotacao}},{new:true},(err)=>{
    if(err){
        next(err);
    }
      res.redirect("/promotor/locais_espetaculos");
    });
};

//Remove da base de dados um local de espetaculos inserido por um determinado promotor

PromotorController.remover_local = function (req, res, next) {
  Locais.remove({_id:req.params.id},(err)=>{
    if(err){
      next(err);
    }
    Eventos.remove({codigo_local:req.params.id},(err)=>{
      if(err){
        next(err);
      }
    })
    res.redirect("/promotor/locais_espetaculos");
  })
};

// Listagem de eventos de um determinado local de espetaculos

PromotorController.listar_eventos = function (req, res) {
  Eventos.find({codigo_local:req.params.local},(err,eventos)=>{
    if(err){
      next(err);
    }
    res.render("promotor/eventos_local",{title:"Eventos do Local",eventos:eventos,local:req.params.local})
  })
};

//Mostra a pagina com o formulario para adicionar um evento a um determinado local de espetaculos

PromotorController.adicionar_evento = function (req, res) {
  res.render("promotor/adicionar_evento",{title:"Adicionar Evento",local:req.params.local,_idPromotor:req.user._id});
};

// Guarda na base de dados o evento criado

PromotorController.guardar_evento = function (req, res) {
 //inserir validaçoes mais tarde
 let errors=[];
 const nome= req.body.nome;
 const data=req.body.data;
 const descricao=req.body.descricao;
 const preco=req.body.preco;
 const bilhetes=req.body.bilhetes;
 const local=req.params.local;
 const poster=file.filename;
Locais.findOne({_id:req.params.local},(err,result)=>{
  if(err){
    next(err);
  }
  const quantidade_bilhetes=Math.floor(result.lotacao-(result.lotacao * (result.limitacao_lotacao/100)));
  if(bilhetes>quantidade_bilhetes){
    errors.push({msg:"Quantidade de bilhetes nao pode ser superior à capacidade permetida do local("+quantidade_bilhetes+")"});
    res.render("promotor/adicionar_evento",{
      errors,
      local,
     nome,
     data,
     descricao,
     preco,
     poster,
     _idPromotor:req.user._id
    })
  }
  else{
    let cod_aleatorio = Math.floor(Math.random() * 10000 + 1);
  let date = new Date();
  let ano = date.getFullYear();
  let mes = ("0" + (date.getMonth() + 1)).slice(-2);
  let dia=("0" + date.getDate()).slice(-2);
  let codigo_evento = ano + mes + dia + cod_aleatorio;
 const evento = {
  nome: req.body.nome,
  id_promotor: req.params.idPromotor,
  data: req.body.data,
  codigo_local: req.params.local,
  descricao:req.body.descricao,
  preco_bilhete: req.body.preco,
  quantidade_bilhetes:req.body.bilhetes,
  codigo_evento:codigo_evento,
  poster:poster
  }

  const novo_evento = new Eventos(evento);
novo_evento.save();
console.log("Evento adicionado com sucesso!");
res.redirect("/promotor/eventos/"+req.params.local);
  }
});
};

// Remove um evento da base de dados

PromotorController.remover_evento = function (req, res) {
 Eventos.remove({_id:req.params.id_evento},(err)=>{
   if(err){
     next(err);
   }
   res.redirect("/promotor/eventos/"+req.params.local)
 })
};

//Mostra a pagina com o formulario para alterar um evento

PromotorController.alterar_evento = function (req, res) {
  Eventos.findOne({_id:req.params.id_evento},(err,evento)=>{
    if(err){
      next(err);
    }
    res.render("promotor/alterar_evento",{title:"Alterar Evento",evento:evento,local:req.params.local})
  })
 };

 //Guarda na base de dados as alteraçoes feitas ao evento

 PromotorController.atualizar_evento = function (req, res) {
  Eventos.findOneAndUpdate({_id:req.params.id_evento},{$set:{nome: req.body.nome,
    data: req.body.data,
    descricao: req.body.descricao,
  preco_bilhete:req.body.preco}},{new:true},(err)=>{
    if(err){
        next(err);
    }
      res.redirect("/promotor/eventos/"+req.params.local);
    });
 };

// Mostra a pagina de gestao dos Bilhetes
// Gestao dos bilheres incompleto.Acabar na 2 parte
PromotorController.bilhetes = function (req, res) {
  res.render("promotor/bilhetes", { title: "Bilhetes" });
};

module.exports = PromotorController;
