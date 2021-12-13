/****************************************************************
 * The object representing a step in a method.
 ****************************************************************/

const ApiError = require("../exception/apiError");

class Step {
    description;
    validation;
    
    check = function() {
        if (this.description === null) {
            throw new ApiError("Missing mandatory parameter: steps.description", 400);
        }
    }
    
    toJson = function() {
        const json = {};
        json["description"] = this.description;
        json["validation"] = this.validation;
        return json;
    }
    
    static fromJson = function(json) {
        const object = new Step;
        object.description = json["description"];
        object.validation = json["validation"];
        return object;
    }
}

module.exports = Step;