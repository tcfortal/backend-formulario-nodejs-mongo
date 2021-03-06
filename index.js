//configuração inicial
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express()
const cors = require("cors");



// forma de ler JSON // middlewares

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(cors());
app.use(express.json())


//Rotas da API

const cadastroRoutes = require('./routes/cadastroRoutes')
app.use('/cadastro', cadastroRoutes)


//rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: 'oi express' })
})


//entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD


mongoose.connect(
    `${process.env.MONGO_URL}`
)
    .then(() => {
        console.log('conectado ao mongoDB')
    })
    .catch((err) => {
        console.log(err, 'erro')
    })
app.listen(process.env.PORT || 3000);