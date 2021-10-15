const {
    body,
    validationResult
} = require("express-validator");

module.exports = {
    postService: [
        body("descricao")
        .isString()
        .withMessage("Formato de Descrição Inválido"),
        body("tipo")
        .isString()
        .withMessage("Tipo de Serviço Inválido"),
        body("id_quarto")
        .isUUID()
        .withMessage("Id do quarto Inválido"),
        body().custom(body => {
            const keys = ['descricao', "tipo", "id_quarto", "horario"];
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
    ]
}