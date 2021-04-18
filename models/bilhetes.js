const mongoose = require("mongoose");

const BilhetesSchema = new mongoose.Schema({
    id_cliente:{
        //type:mongoose.Schema.Types.ObjectId, 
        //ref:'utilizadores',
        type:Number,
        require:true
    },
    codigo_evento:{
        //type:mongoose.Schema.Types.ObjectId,
        //ref:'eventos',
        type:Number,
        require:true
    },
    data_reserva:{ 
        type: Date, 
        default:Date.now,
        require: true
    },
    estado:{
        type:String,
        enum : ['cancelado','pendente','confirmado'],
        default: 'pendente',
        require:true
    },
    teste_covid:{
        type:String,
        maxlength:100
    },
    codigo_bilhete:{
        type:Number,
        unique:true,
        require:true
    }
});

module.exports = mongoose.model("Bilhetes", BilhetesSchema);