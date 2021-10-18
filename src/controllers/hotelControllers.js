const hotelServices = require("../services/hotelServices");

async function check_in(req, res, next) {
    try {
        const token = await hotelServices.check_in(req.body);

        res.status(200).json(token);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function check_out(req, res, next) {
    try {
        const checkout = await hotelServices.check_out(req.body);

        res.status(200).json(checkout);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function quartos(req, res, next) {
    try {
        const quarto = await hotelServices.quartos(req.body);

        res.status(201).json(quarto);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getQuarto(req, res, next){
    try {
        const quarto = await hotelServices.getQuarto(req.query);

        res.status(200).json(quarto);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function deleteQuarto(req, res, next){
    try {
        await hotelServices.deleteQuarto(req.body);

        res.status(204).end();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getQuartobyUser(req, res, next){
    try {
        const id_quarto = await hotelServices.getQuartobyUser(req.body)

        if(!id_quarto){
            throw new Error("Quarto não Encontrado")
        }

        res.status(200).json(id_quarto)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

async function getReservas(req, res, next){
    try {
        const reservas = await hotelServices.getReservas()

        res.status(200).json(reservas)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    quartos,
    check_in,
    check_out,
    getQuarto,
    deleteQuarto,
    getQuartobyUser,
    getReservas
}



