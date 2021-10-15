const serviceServices = require("../services/serviceServices");

async function registerService(req, res, next) {
    try {
        const servico = await serviceServices.register(req.body);

        if(!servico){
            throw new Error("O Serviço não pode ser criado")
        }

        res.status(201).json(servico);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getAll(req, res, next) {
    try {
        const services = await serviceServices.getAll();

        res.status(200).json(services);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function deleteService(req, res, next){
    try {
        const user = await serviceServices.deleteService(req.body);

        res.status(204).end();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function postComida(req,res,next){
    try {
        const comida = await serviceServices.postComida(req.body);

        if(!comida){
            throw new Error("Produto Não Criado")
        }

        res.status(201).json(comida)
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getAllComidas(req,res,next){
    try {
        const comidas = await serviceServices.getAllComidas();

        if(!comidas){
            throw new Error("Produtos Não Encontrados")
        }

        res.status(201).json(comidas)
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getQuartobyUser(req,res,next){
    try {
        const quarto = await serviceServices.getQuartoFromUser(req.query);

        if(!quarto){
            throw new Error("Produtos Não Encontrados")
        }

        res.status(201).json(quarto)
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getServicosUser(req,res,next){
    try {
        const servicos = await serviceServices.getServicosUser(req.query);

        if(!servicos){
            throw new Error("Produtos Não Encontrados")
        }

        res.status(201).json(servicos)
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getComida(req, res, next){
    try {
        const comida = await serviceServices.getComida(req.query);

        if(!comida){
            throw new Error("Produtos Não Encontrado")
        }

        res.status(201).json(comida)
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    registerService,
    getAll,
    deleteService,
    postComida,
    getAllComidas,
    getQuartobyUser,
    getServicosUser,
    getComida
}



