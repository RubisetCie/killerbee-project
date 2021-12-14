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
    deployModel: true,
    deployIngredient: true,
    deployMethod: true
};

if (require.main === module) {
    // Command-line argument parsing
    if (process.argv[2]) {
        switch (process.argv[2]) {
            case "model":
                properties.deployIngredient = false;
                properties.deployMethod = false;
                config.outputFolder += "-model";
                break;
            case "ingredient":
                properties.deployModel = false;
                properties.deployMethod = false;
                config.outputFolder += "-ingredient";
                break;
            case "method":
                properties.deployModel = false;
                properties.deployIngredient = false;
                config.outputFolder += "-method";
                break;
        }
    }

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
            
            if (!properties.deployMethod) {
                fs.unlinkSync(path.join(config.outputFolder, "model", "model.js"));
                fs.unlinkSync(path.join(config.outputFolder, "model", "dimensions.js"));
            }

            fs.unlinkSync(path.join(config.outputFolder, "model", "need.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "request", "modelPost.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "request", "needPost.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "response", "modelResponse.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "response", "modelArrayResponse.js"));
        }
        
        if (!properties.deployIngredient) {
            fs.unlinkSync(path.join(config.outputFolder, "route", "ingredientRoute.js"));
            fs.unlinkSync(path.join(config.outputFolder, "controller", "ingredientController.js"));
            fs.unlinkSync(path.join(config.outputFolder, "service", "ingredientService.js"));
            
            if (!properties.deployModel) {
                fs.unlinkSync(path.join(config.outputFolder, "model", "ingredient.js"));
            }

            fs.unlinkSync(path.join(config.outputFolder, "model", "request", "ingredientPost.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "response", "ingredientResponse.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "response", "ingredientArrayResponse.js"));
        }
        
        if (!properties.deployMethod) {
            fs.unlinkSync(path.join(config.outputFolder, "route", "methodRoute.js"));
            fs.unlinkSync(path.join(config.outputFolder, "controller", "methodController.js"));
            fs.unlinkSync(path.join(config.outputFolder, "service", "methodService.js"));
            
            fs.unlinkSync(path.join(config.outputFolder, "model", "method.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "step.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "request", "methodPost.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "response", "methodResponse.js"));
            fs.unlinkSync(path.join(config.outputFolder, "model", "response", "methodArrayResponse.js"));
        }
    } catch(err) {
        console.error(err);
    }
};