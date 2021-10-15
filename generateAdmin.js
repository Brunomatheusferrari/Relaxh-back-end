const { Usuario } = require("./src/db/models");

(async () => {
    let { nome, email, password } = require('minimist')(process.argv.slice(2));
    
    password = password.toString();

    try {
        await Usuario.create({ nome, email, password, role: "admin" });

        console.log(`Admin com o email: ${email} e senha: ${password} foi criado`);
    } catch (error) {
        console.log("Unable to create admin user");
        console.log(error);
    }
})();