/****************************************************************
 * The object representing a method without external references.
 ****************************************************************/

const Step = require("./step");

class MethodPost {
    name;
    description;
    modelId;
    steps = [];     // Reference to a list of Step objects
    
    static fromJson = function(json) {
        const object = MethodPost;
        
        object.name = json["name"];
        object.description = json["description"];
        object.modelId = json["modelId"];
        
        if (json["steps"]) {
            json["steps"].forEach((entry) => {
                object.steps.push(Step.fromJson(entry));
            });
        }
        
        return object;
    }
}

module.exports = MethodPost;