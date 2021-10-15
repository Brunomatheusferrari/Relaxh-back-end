const express = require("express");
const router = express.Router();

const hotelControllers = require("../controllers/hotelControllers")
const authentication = require("../middlewares/authentication")

const hotelValidation = require("../validations/hotelValidations")

//Depois Coloca
//, authentication(["admin"]), hotelValidation.quartos ,
router.post("/quartos" ,hotelControllers.quartos)
router.post("/checkin", authentication(["admin", "guest"]),hotelValidation.postCheckin , hotelControllers.check_in)
router.post("/checkout", authentication(["admin", "user"]),hotelValidation.postCheckout, hotelControllers.check_out)
router.delete("/quartos/delete", authentication(["admin"]), hotelValidation.quartoDelete,hotelControllers.deleteQuarto)
router.get("/quartos/get", authentication(["admin"]), hotelValidation.quartoGet,hotelControllers.getQuarto)
router.get("/quarto-user", authentication(["admin", "user"]), hotelControllers.getQuartobyUser)

module.exports = router;