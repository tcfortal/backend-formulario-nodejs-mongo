const router = require('express').Router()
const Cadastro = require('../models/Cadastro')



//CREATE- CRIAÇÃO DE DADOS DO CADASTRO

router.post('/', async (req, res) => {

    const { nome, email, telefone, idade, genero, turno } = req.body

    const cadastro = {
        nome,
        email,
        telefone,
        idade,
        genero,
        turno
    }

    try {
        //criando dados
        await Cadastro.create(cadastro)

        res.status(200).json({ message: 'pessoa inserida no cadastro com sucesso' })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})


//GET- RECUPERAR DADOS DO BANCO
router.get('/', async (req, res) => {

    try {

        const cadastros = await Cadastro.find()
        res.status(200).json(cadastros)

    } catch (error) {
        res.status(500).json({ error: error })

    }

})


router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {

        const cadastro = await Cadastro.findOne({ _id: id })
        if (!cadastro) {
            res.status(422).json({ message: 'usuario não foi encontrado' })
            return
        }

        res.status(200).json(cadastro)
    } catch (error) {
        res.status(500).json({ error: error })

    }



})


//UPDATE- EDITAR DADOS
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { nome, email, telefone, idade, genero, turno } = req.body
    const cadastro = {
        nome,
        email,
        telefone,
        idade,
        genero,
        turno
    }

    try {
        const updateCadastro = await Cadastro.updateOne({ _id: id }, cadastro)
        if (updateCadastro.matchedCount === 0) {
            res.status(422).json({ message: 'usuario não foi encontrado' })
            return
        }

        res.status(200).json(cadastro)
    } catch (error) {
        res.status(500).json({ error: error })

    }
})

//DELETE-- DELETAR CADASTRO
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const cadastro = await Cadastro.findOne({ _id: id })
    if (!cadastro) {
        res.status(422).json({ message: 'usuario não foi encontrado' })
        return
    }
    try {
        await Cadastro.deleteOne({ _id: id })
        res.status(200).json({ message: 'cadastro deletado com sucesso' })

    } catch (error) {
        res.status(500).json({ error: error })

    }
})


module.exports = router
