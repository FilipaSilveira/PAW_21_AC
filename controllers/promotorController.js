const { NotExtended } = require("http-errors");
const Locais = require("../models/locais");
const Eventos=require("../models/eventos");
const PromotorController = {};

PromotorController.index = function (req, res, next) {
  res.render("promotor/index_promotor", { title: "Promotor" });
};
PromotorController.locais_espetaculos = function (req, res) {
  Locais.find({}, (err, locais) => {
    if (err) {
      next(err);
    }
    res.render("promotor/locais_espetaculos", {
      title: "Locais Espetaculos",
      locais: locais,
    });
  });
};

PromotorController.adicionar_local = function (req, res, next) {
  res.render("promotor/adicionar_local", { title: "Adicionar Local" });
};

PromotorController.alterar_local = function (req, res, next) {
  Locais.findOne({_id:req.params.id},(err,local)=>{
    if(err){
      next(err);
    }
    res.render("promotor/alterar_local", { title: "Alterar Local", local:local });
  })
  
};

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



PromotorController.remover_local = function (req, res, next) {
  Locais.remove({_id:req.params.id},(err)=>{
    if(err){
      next(err);
    }
    res.redirect("/promotor/locais_espetaculos");
  })
};


PromotorController.guardar_local = function (req, res, next) {
  //validaçoes

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
    codigo_local: codigo_local,
  };
  const novo_local = new Locais(local);
  novo_local.save();
  console.log(novo_local);
  console.log("Local adicionado com sucesso!");
  res.redirect("/promotor/locais_espetaculos");
  
};
PromotorController.listar_eventos = function (req, res) {
  Eventos.find({codigo_local:req.params.local},(err,eventos)=>{
    if(err){
      next(err);
    }
    res.render("promotor/eventos_local",{title:"Eventos do Local",eventos:eventos,local:req.params.local})
  })
};

PromotorController.adicionar_evento = function (req, res) {
    
  /* mudar o id promotor*/ //mudar id para adicionar mais eventos
  res.render("promotor/adicionar_evento",{title:"Adicionar Evento",local:req.params.local,_idPromotor:'60858933413433ecb5b46672'});
    
    
};

PromotorController.guardar_evento = function (req, res) {
 //validaçoes
 let cod_aleatorio = Math.floor(Math.random() * 10000 + 1);
  let data = new Date();
  let ano = data.getFullYear();
  let mes = ("0" + (data.getMonth() + 1)).slice(-2);
  let dia=("0" + data.getDate()).slice(-2);
  let codigo_evento = ano + mes + dia + cod_aleatorio;
 const evento = {
  nome: req.body.nome,
  id_promotor: req.params.idPromotor,
  data: req.body.data,
  codigo_local: req.params.local,
  descricao:req.body.descricao,
  preco_bilhete: req.body.preco,
  codigo_evento:codigo_evento
};


const novo_evento = new Eventos(evento);
novo_evento.save();
console.log(novo_evento);
console.log("Evento adicionado com sucesso!");
res.redirect("/promotor/eventos/"+req.params.local);
/*Eventos.find({codigo_local:req.params.local},(err,eventos)=>{
  if(err){
    next(err);
  }
  res.render("promotor/eventos_local",{title:"Eventos do Local",eventos:eventos,local:req.params.id})
})*/

};

PromotorController.remover_evento = function (req, res) {
 Eventos.remove({_id:req.params.id_evento},(err)=>{
   if(err){
     next(err);
   }
   res.redirect("/promotor/eventos/"+req.params.local)
 })
};

PromotorController.alterar_evento = function (req, res) {
  Eventos.findOne({_id:req.params.id_evento},(err,evento)=>{
    if(err){
      next(err);
    }
    res.render("promotor/alterar_evento",{title:"Alterar Evento",evento:evento,local:req.params.local})
  })
    
 };

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

PromotorController.bilhetes = function (req, res) {
  res.render("promotor/bilhetes", { title: "Bilhetes" });
};



module.exports = PromotorController;
