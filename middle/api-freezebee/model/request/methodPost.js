/****************************************************************
 * The object representing a method without external references.
 ****************************************************************/

const ObjectID = require("mongodb").ObjectID;
const Step = require("../step");
const ApiError = require("../../exception/apiError");

const { isUndefined } = require("../../utils/memUtils");

class MethodPost {
    name;
    description;
    model;
    steps;          // Reference to a list of Step objects
    
    check = function() {
        if (isUndefined(this.name)) {
            throw new ApiError("Missing mandatory parameter: name", 400);
        }

        if (!isUndefined(this.steps)) {
            this.steps.forEach((obj) => { obj.check(); });
        } else {
            throw new ApiError("Missing mandatory parameter: steps", 400);
        }
    }
    
    toJson = function() {
        const json = {};
        
        json["name"] = this.name;
        if (!isUndefined(this.description)) json["description"] = this.description;
        if (!isUndefined(this.model))       json["model"] = { "_id": new ObjectID(this.model) };
        
        if (!isUndefined(this.steps)) {
            json["steps"] = [];
            this.steps.forEach((obj) => {
                json["steps"].push(obj.toJson());
            });
        }

        return json;
    }
    
    static fromJson = function(json) {
        const object = new MethodPost;
        
        object.name = json["name"];
        if (!isUndefined(json["description"]))  object.description = json["description"];
        if (!isUndefined(json["model"]))        object.model = json["model"];
        
        if (!isUndefined(json["steps"])) {
            this.steps = [];
            json["steps"].forEach((entry) => {
                object.steps.push(Step.fromJson(entry));
            });
        }
        
        return object;
    }
}

module.exports = MethodPost;