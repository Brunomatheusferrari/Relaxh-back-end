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
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const html = `<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>

          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
 
          .body {
            background-color: #f6f6f6;
            width: 100%; 
          }

          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }
    
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }
    
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
    
          .footer {
            clear: both;
            margin-top: 10px;
            text-align: center;
            width: 100%; 
          }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #999999;
              font-size: 12px;
              text-align: center; 
          }

          h1,
          h2,
          h3,
          h4 {
            color: #000000;
            font-family: sans-serif;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            margin-bottom: 30px; 
          }
    
          h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize; 
          }
    
          p,
          ul,
          ol {
            font-family: sans-serif;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px; 
          }
            p li,
            ul li,
            ol li {
              list-style-position: inside;
              margin-left: 5px; 
          }
    
          a {
            color: #3498db;
            text-decoration: underline; 
          }
    
          .btn {
            box-sizing: border-box;
            width: 100%; }
            .btn > tbody > tr > td {
              padding-bottom: 15px; }
            .btn table {
              width: auto; 
          }
            .btn table td {
              background-color: #ffffff;
              border-radius: 5px;
              text-align: center; 
          }
            .btn a {
              background-color: #ffffff;
              border: solid 1px #3498db;
              border-radius: 5px;
              box-sizing: border-box;
              color: #3498db;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 12px 25px;
              text-decoration: none;
              text-transform: capitalize; 
          }
    
          .btn-primary table td {
            background-color: #3498db; 
          }
    
          .btn-primary a {
            background-color: #3498db;
            border-color: #3498db;
            color: #ffffff; 
          }
    
          .last {
            margin-bottom: 0; 
          }
    
          .first {
            margin-top: 0; 
          }
    
          .align-center {
            text-align: center; 
          }
    
          .align-right {
            text-align: right; 
          }
    
          .align-left {
            text-align: left; 
          }
    
          .clear {
            clear: both; 
          }
    
          .mt0 {
            margin-top: 0; 
          }
    
          .mb0 {
            margin-bottom: 0; 
          }
    
          .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0; 
          }
    
          .powered-by a {
            text-decoration: none; 
          }
    
          hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            margin: 20px 0; 
          }

          @media only screen and (max-width: 620px) {
            table[class=body] h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important; 
            }
            table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
              font-size: 16px !important; 
            }
            table[class=body] .wrapper,
            table[class=body] .article {
              padding: 10px !important; 
            }
            table[class=body] .content {
              padding: 0 !important; 
            }
            table[class=body] .container {
              padding: 0 !important;
              width: 100% !important; 
            }
            table[class=body] .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important; 
            }
            table[class=body] .btn table {
              width: 100% !important; 
            }
            table[class=body] .btn a {
              width: 100% !important; 
            }
            table[class=body] .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important; 
            }
          }
    
          @media all {
            .ExternalClass {
              width: 100%; 
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%; 
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important; 
            }
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
              font-size: inherit;
              font-family: inherit;
              font-weight: inherit;
              line-height: inherit;
            }
            .btn-primary table td:hover {
              background-color: #34495e !important; 
            }
            .btn-primary a:hover {
              background-color: #34495e !important;
              border-color: #34495e !important; 
            } 
          }
    
        </style>
      </head>
      <body class="">
        <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">
    
                <table role="presentation" class="main">
    
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p>Olá,</p>
                            `
                            +
                            `<p>${text}</p>`
                            +
                            `
                            <p></p>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                              <tbody>
                                <tr>
                                  <td align="center">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr">
                                        ` +
                                        '<img src="' + canvas.toDataURL() + '" />'
                                        +
                                        `
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p>Nos sentimos lisongeados pela sua preferência de hotel.O hotel oferece diverços serviço para toda a família sem contar o conforto e a acessibilidade e rapidez do check-in e chek-out.</p>
                            <p>E lebre-se Just Relaxh</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                </table>
    
                <div class="footer">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block">
                        <span class="apple-link">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                        <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block powered-by">
                        Powered by <a href="http://htmlemail.io">HTMLemail</a>.
                      </td>
                    </tr>
                  </table>
                </div>

              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>`

    const emailText = {
        from: "no-reply@hyperw.com",
        to: email,  
        attachDataUrls: true,
        subject: "Relaxh",
        text: "Obrigado Pela Preferência, aqui está o seu qrcode",
        html: `<p>${text}</p>` + "\n" + '<img src="' + canvas.toDataURL() + '" />'
    }

    await transporter.sendMail(emailText, function (error, info) {
        if (error) {
            console.log(error);
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

    sendEmail(user.email,"Aqui está o seu código qr para fazer seu Check-out")

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

async function getReservas(){
    return await Reserva.findAll()
}

module.exports = {
    quartos,
    check_in,
    check_out,
    getQuarto,
    deleteQuarto,
    getQuartobyUser,
    getReservas
};