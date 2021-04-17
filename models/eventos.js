const mongoose = require("mongoose");

const EventosSchema = new mongoose.Schema({
    nome_evento:{
        type: String,
        maxlength:50,
        require: true
    },
    id_promotor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'utilizadores',
        require:true
    },
    data_evento:{ 
        type: Date, 
        min:'2021-04-15',
        max:'2050-04-15',
        require: true
    },
    morada:{
        type:String,
        maxlength:100,
        minlength:1
    },
    limitacao_lotacao:{
        type:Number,
        min:1,
        max:99
    },
    lotacao:{
        type:Number,
        min:1
    },
    descricao:{
        type: String,
        maxlength: 100,
        require: true
    },
    preco_bilhete:{
        type:mongoose.Types.Decimal128,
        min:1,
    },
    codigo_evento:{
        type:Number,
        unique:true,
        require:true
    }
});

module.exports = mongoose.model("Eventos", EventosSchema);