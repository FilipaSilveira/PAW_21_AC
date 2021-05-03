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
    codigo:{
        type:Number,
        require:true
    },
    id_promotor:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Locais", LocaisSchema);