const mongoose = require('mongoose')

const Cadastro = mongoose.model('Cadastro',{
    nome: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    telefone:{
        type: Number,
        required: true,
    },
    idade:{
        type: String,
        required: true,
    },
    genero:{
        type: String,
        required: true,
    },
    turno:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },

})

module.exports = Cadastro