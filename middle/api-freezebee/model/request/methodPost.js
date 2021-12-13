/****************************************************************
 * The object representing a method without external references.
 ****************************************************************/

const ObjectID = require("mongodb").ObjectID;
const Step = require("./step");
const ApiError = require("../../exception/apiError");

class MethodPost {
    name;
    description;
    model;
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
        json["model"] = this.model ? { "_id": new ObjectID(this.model) } : null;
        
        json["steps"] = [];
        this.steps.forEach((obj) => {
            json["steps"].push(obj.toJson());
        });

        return json;
    }
    
    static fromJson = function(json) {
        const object = new MethodPost;
        
        object.name = json["name"];
        object.description = json["description"];
        object.model = json["model"];
        
        if (json["steps"]) {
            json["steps"].forEach((entry) => {
                object.steps.push(Step.fromJson(entry));
            });
        }
        
        return object;
    }
}

module.exports = MethodPost;