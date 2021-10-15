const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/userControllers");

const usuarioValidations = require("../validations/userValidations");

const authentication = require("../middlewares/authentication");
const userValidations = require("../validations/userValidations");

router.post("/create", usuarioValidations.post, usersControllers.create);
router.get("/", authentication(["guest", "admin", "user"]), usersControllers.getUser)
router.put("/edit", authentication(["guest", "admin", "user"]), usuarioValidations.put, usersControllers.editUser)
router.delete("/delete", authentication(["guest", "admin", "user"]),usuarioValidations.delete , usersControllers.deleteUser)
router.post("/reserve", authentication(["guest", "admin", "user"]),usuarioValidations.postReserva ,usersControllers.reserve)
router.delete("/reserve/delete", authentication(["guest", "admin", "user"]), usuarioValidations.deleteReserva, usersControllers.deleteReserva)
router.get("/reserve/get", authentication(["guest", "admin", "user"]),userValidations.getReserva, usersControllers.getReserva)

module.exports = router;