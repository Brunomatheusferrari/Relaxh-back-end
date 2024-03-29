const {
    body,
    validationResult
} = require("express-validator");

module.exports = {
    postService: [

        body("tipo")
        .isString()
        .withMessage("Tipo de Serviço Inválido"),
        body("id_quarto")
        .isUUID()
        .withMessage("Id do quarto Inválido"),
        body().custom(body => {
            const keys = ['descricao', "tipo", "id_quarto", "horario", "comidas"];
            return Object.keys(body).every(key => keys.includes(key));
        }).withMessage('Parâmetros extras enviados'),
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            next();
        }
    ],
    serviceGet: [
        body("id")
        .isUUID()
        .withMessage("id do serviço Inválido"),
        body().custom(body => {
            const keys = ['id'];
            return Object.keys(body).every(key => keys.includes(key));
        }).withMessage('Parâmetros extras enviados'),
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            next();
        }
    ],
    postComida: [
        body("tipo")
        .isString()
        .withMessage("Tipo de serviço inválido"),
        body("nome")
        .isString()
        .withMessage("nome Inválido"),
        body().custom(body => {
            const keys = ['tipo',"preco","nome"];
            return Object.keys(body).every(key => keys.includes(key));
        }).withMessage('Parâmetros extras enviados'),
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            next();
        }
    ],
    idValidation: [
        body("id")
        .isUUID()
        .withMessage("Formato de Id inválido"),
        body().custom(body => {
            const keys = ['id'];
            return Object.keys(body).every(key => keys.includes(key));
        }).withMessage('Parâmetros extras enviados'),
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            next();
        }
    ]
}