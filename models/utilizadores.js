const { text } = require("express");
const mongoose = require("mongoose");

const UtilizadoresSchema = new mongoose.Schema({
    nome:{
        type:String,
        length:100,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        length:50,
        require:true
    },
    nif:{
        type:Number,
        min:11111111,
        max:99999999,
        unique:true,
        require:true
    },
    tipo_utilizador: {
        type: String,
        enum : ['admin','promotor','cliente'],
        default: 'admin',
        require:true
    },
    data_nascimento:{
        type:Date,
        require:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Utilizadores", UtilizadoresSchema);