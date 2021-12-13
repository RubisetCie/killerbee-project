/****************************************************************
 * The object representing a method to make a model.
 ****************************************************************/

const Model = require("./model");
const Step = require("./step");
const ApiError = require("../exception/apiError");

class Method {
    name;
    description;
    model;          // Reference to a Model object
    steps = [];     // Reference to a list of Step objects
    
    check = function() {
        if (this.name === null) {
            throw new ApiError("Missing mandatory parameter: name", 400);
        }

        if (this.steps !== null) {
            this.steps.forEach((obj) => { obj.check(); });
        } else {
            throw new ApiError("Missing mandatory parameter: steps", 400);
        }
    }
    
    toJson = function() {
        const json = {};
        
        json["name"] = this.name;
        json["description"] = this.description;
        json["model"] = this.model ? this.model.toJson() : null;
        
        json["steps"] = [];
        this.steps.forEach((obj) => {
            json["steps"].push(obj.toJson());
        });

        return json;
    }
    
    static fromJson = function(json) {
        const object = new Method;

        object.name = json["name"];
        object.description = json["description"];
        object.model = json["model"] ? Model.fromJson(json["model"]) : null;
        
        if (json["steps"]) {
            json["steps"].forEach((entry) => {
                object.steps.push(Step.fromJson(entry));
            });
        }

        return object;
    }
}

module.exports = Method;