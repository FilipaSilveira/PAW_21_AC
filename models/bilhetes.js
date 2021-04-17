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
        min:'2021-04-15',
        max:'2050-04-15',
        require: true
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