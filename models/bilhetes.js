const mongoose = require("mongoose");

const BilhetesSchema = new mongoose.Schema({
    id_cliente:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'utilizadores',
        require:true
    },
    codigo_evento:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'eventos',
        require:true
    },
    data_reserva:{ 
        type: Date, 
        default:Date.now,
        require: true
    },
    estado:{
        type:String,
        enum : ['Cancelado','Pendente','Confirmado'],
        default: 'pendente',
        require:true
    },
    teste_covid:{
        type:String,
        enum:['Positivo','Negativo']
    },
    codigo_bilhete:{
        type:Number,
        unique:true,
        require:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Bilhetes", BilhetesSchema);