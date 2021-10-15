const createHttpError = require("http-errors");
const { Servico, Quarto, Comida, Usuario, Reserva, Comida_Servico} = require("../db/models");

async function register(serviceInfo){
    const {comidas, tipo, horario, descricao, id_quarto} = serviceInfo

    // const idComidas = comidas.map(comida => comida.id)    

    const servico = await Servico.create({
        tipo,
        horario,
        descricao,
        id_quarto,
    })

    if(!comidas){
        return  servico
    }

    const vetorServicos = comidas.map(comida => ({id_comida: comida.id, id_servico: servico.id,quantidade: comida.quantidade}))

    return await Comida_Servico.bulkCreate(vetorServicos, {returning: true})
}

async function getAll(){
    const servicos = await Servico.findAll() 
    return servicos
}

async function deleteService({id}){
    const servico = await Servico.findOne({
        where: {
            id
        }
    })

    if(!servico){
        throw new createHttpError(404, "Sevice not found");
    }

    await servico.destroy()
}

async function postComida(info){
    const { tipo, preco, nome} = info

    return await Comida.create({
        tipo,
        preco,
        nome
    })
}

async function getAllComidas(){
    return await Comida.findAll()
}

async function getQuartoFromUser({id}){
    try {
        const user = await Usuario.findOne({
            where: {
                id
            }
        })

        if(!user){
            throw new Error("Usuário não encontrado")
        }

        const reserva = await Reserva.findOne({
            where: {
                id_usuario: user.dataValues.id
            }
        })

        if(!reserva){
            throw new Error("Reserva com este usuário não encontrada")
        }

        const quarto = await Quarto.findOne({
            where: {
                id: reserva.id_quarto
            }
        })

        return quarto
    } catch (error) {
        console.log(error)
    }
}

async function getServicosUser({id}){
    const servicos = await Servico.findAll({
        where:{
            id_quarto: id
        },
        include: [
            { association: "comidas", through: { attributes: ["quantidade"] } }
        ],        
    });    

    return (servicos);    
}

async function getComida({id}){
    return await Comida.findOne({
        where: {
            id
        }
    })
}

module.exports = {
    register,
    getAll,
    deleteService,
    postComida,
    getAllComidas,
    getQuartoFromUser,
    getServicosUser,
    getComida
};