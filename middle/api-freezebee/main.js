/****************************************************************
 * The starting point of the API.
 ****************************************************************/

// External modules
const express = require("express");
const swagger = require("swagger-ui-express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

// Environment configuration
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Internal modules
//! if (deployModel) {
const routerModel = require("./route/modelRoute");
//! }
//! if (deployMethod) {
const routerMethod = require("./route/methodRoute");
//! }
//! if (deployIngredient) {
const routerIngredient = require("./route/ingredientRoute");
//! }
const authentication = require("./controller/authController");

// Loading the documentation
const swaggerDocument = require("yamljs").load("./swagger/swagger.yaml");
const swaggerOptions = {
    explorer: false
};

// App creation
const app = express();

app.use(require('body-parser').json());
app.use(cors());
app.use("/docs", swagger.serve, swagger.setup(swaggerDocument, swaggerOptions));
app.use(morgan("common", {stream: fs.createWriteStream(__dirname + "/access.log", { flags: "a" })}));
app.use(morgan("tiny"));

app.get("/test", function (_, res) {
    console.log("Echo !");
    res.json({ message: "Echo !" });
});

app.post("/login", authentication.login);
app.post("/logout", authentication.logout);
app.post("/token", authentication.token);

app.use(authentication.authenticate);

//! if (deployModel) {
app.use("/model", routerModel);
//! }
//! if (deployMethod) {
app.use("/method", routerMethod);
//! }
//! if (deployIngredient) {
app.use("/ingredient", routerIngredient);
//! }

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
