const {
    body,
    validationResult
} = require("express-validator");

module.exports = {
    login:[
        body("email")
        .isEmail()
        .withMessage("E-mail inválido"),
        body("password")
        .isStrongPassword()
        .withMessage("Senha inválida"),
        body().custom(body => {
            const keys = ['email', 'password'];
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
    refresh: [
        body("refreshToken")
        .isJWT()
        .withMessage("Formato de Token Inválido"),
        body().custom(body => {
            const keys = ['refreshToken'];
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