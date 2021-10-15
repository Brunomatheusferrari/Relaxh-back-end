const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");

const authValidations = require("../validations/authValidations")

router.post("/login", authValidations.login , authControllers.login);
router.post("/refresh", authValidations.refresh ,authControllers.refresh);

module.exports = router;