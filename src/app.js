const express = require("express");
const cors = require("cors");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const PORT = process.env.PORT || 3001;

const usersRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const serviceRoutes = require("./routes/serviceRoutes")

const erroHandler = require("./middlewares/erroHandler");

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/hotel", hotelRoutes);
app.use("/service", serviceRoutes)

app.use(erroHandler);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app