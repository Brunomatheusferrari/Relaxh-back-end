const express = require("express");
const router = express.Router();

const serviceControllers = require("../controllers/serviceControllers")
const authentication = require("../middlewares/authentication")

const serviceValidation = require("../validations/serviceValidation")

router.post("/" , authentication(["admin", "user"]), serviceValidation.postService ,serviceControllers.registerService)
router.get("/getAll", authentication(["admin"]),serviceControllers.getAll)
router.delete("/delete", authentication(["user","admin"]),serviceControllers.deleteService)
router.post("/comida", authentication(["admin"]), serviceValidation.postComida,serviceControllers.postComida)
router.get("/getComidas", authentication(["user","admin"]),serviceControllers.getAllComidas)
router.get("/getQuartobyUser", authentication(["user","admin"]), serviceControllers.getQuartobyUser)
router.get("/getServicosUser", authentication(["user","admin"]),serviceControllers.getServicosUser)

module.exports = router;