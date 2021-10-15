const createHttpError = require("http-errors")
const { Usuario, Quarto, Reserva} = require("../db/models");
const nodemail = require("nodemailer")
const QRCode = require('qrcode');
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode")
const { createCanvas } = require('canvas');

const canvas = createCanvas(300, 300)

async function createUser(user) {
    const [newUser, created] = await Usuario.findOrCreate({
        where: {
            email: user.email
        },
        defaults: {
            ...user,
        }
    });

    if (!created) {
        throw new createHttpError(409, "E-mail already registered");
    }

    return newUser;
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

async function qrCode(tokenReserva) {
    await QRCode.toCanvas(canvas, tokenReserva, function (err, string) {
        if (err) throw err
    })
}

async function getUserByEmail(email) {
    return await Usuario.findOne({
        where: {
            email
        }
    })
}

async function getRoom(tipoQuarto) {
    return await Quarto.findOne({
        where: {
            disponibilidade: true,
            tipo_quarto: tipoQuarto
        }
    })
}

async function createReserva(usuario, quarto, data_entrada, data_saida) {
    return await Reserva.create({
        tipo_quarto: quarto.tipo_quarto,
        numero_pessoas: quarto.numero_pessoas,
        numero_quarto: quarto.numero_quarto,
        data_entrada: data_entrada,
        data_saida: data_saida,
        id_usuario: usuario.id,
        id_quarto: quarto.id
    })
}

function generateToken(data, reserva) {
    return jwt.sign({
        id_reserva: reserva.id
    }, process.env.TOKEN_SECRET, {
        expiresIn: data
    });
}

async function reserve(InfoReserva) {
    const {
        email,
        tipo_quarto,
        numero_pessoas,
        data_entrada,
        data_saida
    } = InfoReserva

    const user = await getUserByEmail(email)

    if (!user) {
        throw new createHttpError(404, "User not Found");
    }

    const quarto = await getRoom(tipo_quarto)

    if (!quarto) {
        throw new createHttpError(404, "Não há quartos disponiveis");
    }

    //Mudando Infos da Reserva
    quarto.disponibilidade = false,
        quarto.numero_pessoas = numero_pessoas,
        await quarto.save()

    const reserva = await createReserva(user, quarto, data_entrada, data_saida)

    const token = generateToken(data_entrada, reserva)

    qrCode(token)

    sendEmail(user.email, "Check-in")

    return token
}

async function getUser(id){
    try {
        const user = await Usuario.findOne({
            where: {
                id
            }
        })

        if(!user){
            throw new createHttpError(404, "User not found");
        }

        return user
        
    } catch (error) {
        throw new createHttpError(404, `${error}`)
    }
}

async function editUser(infoUser) {
    const userId = infoUser.id    
    const { nome } = infoUser

        const user = await Usuario.findOne({ where: { id: userId }});

        if (!user) {
            throw new createHttpError(404, "User not found");
        }

        // Atualizando o User
        Object.assign(user, { nome });

        await user.save();

        return user
}

async function deleteUser({id}){
    const user = await Usuario.findOne({
        where: {
            id
        }
    })

    if (!user) {
        throw new createHttpError(404, "User not found");
    }

    await user.destroy()
}

async function getReserva({id}){
    const reserva = await Reserva.findOne({
        where: {
            id
        }
    })

    if(!reserva){
        throw new createHttpError(404, "Reserva not found");
    }

    return reserva
}

async function deleteReserva({id}){
    const reserva = getReserva(id)

    if(!reserva){
        throw new createHttpError(404, "Reserva not found");
    }

    await reserva.destroy()
}

module.exports = {
    createUser,
    reserve,
    getReserva,
    deleteReserva,
    getUser,
    editUser,
    deleteUser
};