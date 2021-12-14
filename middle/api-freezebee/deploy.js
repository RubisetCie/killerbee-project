/****************************************************************
 * The script that generates a preprocessed version of the API.
 ****************************************************************/

// External modules
const fs = require('fs');
const path = require('path');
const { preprocess } = require("node-js-preprocessor");

// Preprocessor configuration
const config = {
    inputFolder: ".",
    outputFolder: "../api-freezebee-target"
};

const properties = {
    deployModel: false,
    deployIngredient: true,
    deployMethod: true
};

if (require.main === module) {
    try {
        // Run the preprocessor
        preprocess(config, properties);
        
        // Remove this file from the target
        fs.unlinkSync(path.join(config.outputFolder, path.basename(__filename)));
        
        // Remove undeployed files
        if (!properties.deployModel) {
            fs.unlinkSync(path.join(config.outputFolder, "route", "modelRoute.js"));
            fs.unlinkSync(path.join(config.outputFolder, "controller", "modelController.js"));
            fs.unlinkSync(path.join(config.outputFolder, "service", "modelService.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "model.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "dimensions.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "need.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "request", "modelPost.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "request", "needPost.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "response", "modelResponse.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "response", "modelArrayResponse.js"));
        }
        
        if (!properties.deployIngredient) {
            fs.unlinkSync(path.join(config.outputFolder, "controller", "ingredientController.js"));
        }
        
        if (!properties.deployMethod) {
            fs.unlinkSync(path.join(config.outputFolder, "controller", "methodController.js"));
        }
    } catch(err) {
        console.error(err);
    }
};