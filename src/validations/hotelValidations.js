const {
    body,
    validationResult
} = require("express-validator");

module.exports = {
    postCheckin: [
        body("token")
        .isJWT()
        .withMessage("Formato de Token Inválido"),
        body().custom(body => {
            const keys = ['token'];
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
    postCheckout: [
        body("token")
        .isJWT()
        .withMessage("Formato de Token Inválido"),
        body().custom(body => {
            const keys = ['token'];
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
    quartos: [
        body("tipo_quarto")
        .isIn(["Standart", "Premium", "Deluxe"])
        .withMessage("Tipo do quarto Inválido"),
        body("numero_quarto")
        .isInt()
        .withMessage("Numero de Quarto Inválido"),
        body().custom(body => {
            const keys = ['tipo_quarto', 'numero_quarto'];
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
    quartoDelete: [
        body("id")
        .isUUID()
        .withMessage("id do quarto Inválido"),
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
    quartoGet: [
        body("id")
        .isUUID()
        .withMessage("id do quarto Inválido"),
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
    quartoByUser: [
        body("id")
        .isUUID()
        .withMessage("id do usuário inválido"),
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