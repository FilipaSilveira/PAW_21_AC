const mongoose = require("mongoose");

const LocaisSchema = new mongoose.Schema({
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
    codigo_local:{
        type:Number,
        unique:true,
        require:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Locais", LocaisSchema);