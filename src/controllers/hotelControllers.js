const hotelServices = require("../services/hotelServices");

async function check_in(req, res, next) {
    try {
        const user = await hotelServices.check_in(req.body);

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function check_out(req, res, next) {
    try {
        const user = await hotelServices.check_out(req.body);

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function quartos(req, res, next) {
    try {
        const user = await hotelServices.quartos(req.body);

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getQuarto(req, res, next){
    try {
        const quarto = await hotelServices.getQuarto(req.body);

        res.status(201).json(quarto);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


async function deleteQuarto(req, res, next){
    try {
        const user = await hotelServices.deleteQuarto(req.body);

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

        res.status(201).json(id_quarto)
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
    getQuartobyUser
}



