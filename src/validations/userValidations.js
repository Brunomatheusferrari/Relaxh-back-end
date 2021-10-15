const {
    body,
    validationResult
} = require("express-validator");

module.exports = {
    post: [
        body("nome")
        .isLength({
            min: 4
        })
        .withMessage("Nome inválido"),
        body("email")
        .isEmail()
        .withMessage("E-mail inválido"),
        body("password")
        .isStrongPassword()
        .withMessage("Senha Fraca"),
        body().custom(body => {
            const keys = ['nome', 'email', 'password'];
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
    put: [
        body("id")
        .isUUID()
        .withMessage("Formato Incorreto"),
        body("nome")
        .isLength({
            min: 4
        })
        .withMessage("Nome inválido"),
        body().custom(body => {
            const keys = ['id', 'nome'];
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
    get: [
        body("id")
        .isUUID()
        .withMessage("Formato Incorreto"),
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
    delete: [
        body("id")
        .isUUID()
        .withMessage("Formato Incorreto"),
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
    postReserva: [
        body("email")
        .isEmail()
        .withMessage("E-mail Inválido"),
        body("tipo_quarto")
        .isIn(["Standart", "Premium", "Deluxe"])
        .withMessage("Tipo do quarto Inválido"),
        body("numero_pessoas")
        .isInt()
        .withMessage("Numero de Pessoas Inválido"),
        body().custom(body => {
            const keys = ['email', 'tipo_quarto', 'numero_pessoas', "data_entrada", "data_saida"];
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
    deleteReserva: [
        body("id")
        .isUUID()
        .withMessage("Formato Incorreto"),
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
    getReserva: [
        body("id")
        .isUUID()
        .withMessage("Formato Incorreto"),
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