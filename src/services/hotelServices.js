const createHttpError = require("http-errors")
const { Usuario, Quarto, Reserva} = require("../db/models");
const nodemail = require("nodemailer")
const QRCode = require('qrcode');
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode")
const { createCanvas } = require('canvas')

const canvas = createCanvas(300, 300)

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }

 async function verifyTokenExpiration({
    token
}) {
    var current_time = Date.now() / 1000;

    if (jwt.exp < current_time) {
        return null
    }

    return token
}

async function getUserById(id){
    return await Usuario.findOne({
        where: {
            id: id
        }
    })
}

function generateToken(data, reserva) {
    return jwt.sign({
        id_reserva: reserva.id
    }, process.env.TOKEN_SECRET, {
        expiresIn: data
    });
}

async function qrCode(tokenReserva) {
    await QRCode.toCanvas(canvas, tokenReserva, function (err, string) {
        if (err) throw err
    })
}

async function sendEmail(email,text) {
    const transporter = nodemail.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const emailText = {
        from: process.env.EMAIL_USER,
        to: email,
        attachDataUrls: true,
        subject: "Relaxh",
        text: "Obrigado Pela Preferência, aqui está o seu qrcode",
        html: `<p>${text}</p>` + "\n" + '<img src="' + canvas.toDataURL() + '" />'
    }

    await transporter.sendMail(emailText, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("E-mail Enviado")
        }
    })
}

async function check_in({token}) {
    const validToken = verifyTokenExpiration(token)

    if (!validToken) {
        throw new createHttpError(401, "Token Expirou");
    }

    const {
        id_reserva
    } = jwt_decode(token)

    const reserva = await Reserva.findOne({
        where: {
            id: id_reserva
        }
    })

    const user = await getUserById(reserva.id_usuario)

    //Mudando info do usuário
    user.role = "user"
    await user.save()

    const newToken = generateToken(toTimestamp(reserva.data_saida), reserva)

    qrCode(newToken)

    sendEmail(user.email,"Check-out")

    return newToken
}

async function check_out({
    token
}) {
    const validToken = verifyTokenExpiration(token)

    if (!validToken) {
        throw new createHttpError(401, "Token Expirou");
    }

    const {
        id_reserva
    } = jwt_decode(token)

    const reserva = await Reserva.findOne({
        where: {
            id: id_reserva
        }
    })

    if(!reserva){
        throw new createHttpError(404, "Reserva não encontrada");
    }

    const quarto = await Quarto.findOne({
        where: {
            id: reserva.id_quarto
        }
    })

    const user = await getUserById(reserva.id_usuario)

    //Mudando Infos da Reserva
    quarto.disponibilidade = true,
        quarto.numero_pessoas = 0,
        await quarto.save()

    //Mudando info do usuário
    user.role = "guest"
    await user.save()

    await reserva.destroy()

    return "Check-out"
}

async function quartos(infoQuarto) {
    const {
        tipo_quarto,
        numero_quarto
    } = infoQuarto

    const quarto = await Quarto.create({
        numero_quarto: numero_quarto,
        tipo_quarto: tipo_quarto
    })

    return quarto
}

async function getQuarto({id}){
    const quarto = await Quarto.findOne({
        where: {
            id
        }
    })

    if(!quarto){
        throw new createHttpError(404, "Quarto not found");
    }

    return quarto
}

async function deleteQuarto({id}){
    const quarto = getQuarto(id)

    await quarto.destroy()
}

async function getQuartobyUser({id}){
    const reserva = await Reserva.findOne({
        where:{
            id_usuario: id
        }
    })

    return reserva.id_quarto    
}



module.exports = {
    quartos,
    check_in,
    check_out,
    getQuarto,
    deleteQuarto,
    getQuartobyUser
};