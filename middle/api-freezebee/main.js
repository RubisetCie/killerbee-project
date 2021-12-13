/****************************************************************
 * The starting point of the API.
 ****************************************************************/

// External modules
const express = require("express");
const swagger = require("swagger-ui-express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

// Internal modules
const routerModel = require("./route/modelRoute");
const routerMethod = require("./route/methodRoute");
const routerIngredient = require("./route/ingredientRoute");
const authentication = require("./controller/authController");

// Environment configuration
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Loading the documentation
const swaggerDocument = require("yamljs").load("./swagger/swagger.yaml");
const swaggerOptions = {
    explorer: false
};

// App creation
const app = express();

app.use(cors());
app.use("/docs", swagger.serve, swagger.setup(swaggerDocument, swaggerOptions));
app.use(morgan("common", {stream: fs.createWriteStream(__dirname + "/access.log", { flags: "a" })}));

app.post("/login", authentication.login);
app.post("/logout", authentication.logout);
app.post("/token", authentication.token);

app.use(authentication.authentication);

app.use("/model", routerModel);
app.use("/method", routerMethod);
app.use("/ingredient", routerIngredient);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
