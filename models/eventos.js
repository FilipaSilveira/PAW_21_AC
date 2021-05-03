const mongoose = require("mongoose");

const EventosSchema = new mongoose.Schema({
    nome:{
        type: String,
        maxlength:50,
        require: true
    },
    id_promotor:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    quantidade_bilhetes:{
        type:Number,
        min:1,
        require:true
    },
    data:{
        type:Date,
        require:true
    },
    codigo_local:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
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
    },
    poster:{
        type:String,
        unique:true,
        require:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Eventos", EventosSchema);