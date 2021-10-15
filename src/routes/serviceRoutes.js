const express = require("express");
const router = express.Router();

const serviceControllers = require("../controllers/serviceControllers")
const authentication = require("../middlewares/authentication")

const serviceValidation = require("../validations/serviceValidation")

//Depois Coloca
//, authentication(["admin", "user"]),serviceValidation.postService
router.post("/" ,serviceControllers.registerService)
router.get("/getAll", authentication(["admin"]),serviceControllers.getAll)
router.delete("/delete", authentication(["user","admin"]), serviceValidation.serviceGet,serviceControllers.deleteService)
router.post("/comida",serviceControllers.postComida)
router.get("/getComidas", serviceControllers.getAllComidas)
router.get("/getQuartobyUser", serviceControllers.getQuartobyUser)
router.get("/getServicosUser", serviceControllers.getServicosUser)
router.get("/getComida", serviceControllers.getComida)

module.exports = router;