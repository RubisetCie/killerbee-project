/****************************************************************
 * The object representing a model without external references.
 ****************************************************************/

const Color = require("../color");
const Dimensions = require("../dimensions");
const NeedPost = require("./needPost");
const ApiError = require("../../exception/apiError");

class ModelPost {
    name;
    reference;
    description;
    variety;
    color;          // Reference to a Color object
    price;
    dimensions;     // Reference to a Dimensions object
    mass;
    lift;
    needs;          // Reference to a list of NeedPost objects
    
    check = function() {
        if (this.name === null)         throw new ApiError("Missing mandatory parameter: name", 400);
        if (this.reference === null)    throw new ApiError("Missing mandatory parameter: reference", 400);
        if (this.price === null)        throw new ApiError("Missing mandatory parameter: price", 400);
        
        if (this.color !== null)        this.color.check();
        if (this.dimensions !== null)   this.dimensions.check();
    }
    
    checkWeak = function() {
        if (this.color !== null)        this.color.check();
        if (this.dimensions !== null)   this.dimensions.check();
    }
    
    toJson = function() {
        const json = {};

        json["name"] = this.name;
        json["reference"] = this.reference;
        if (this.description !== null)  json["description"] = this.description;
        if (this.variety !== null)      json["variety"] = this.variety;
        if (this.color !== null)        json["color"] = this.color.toJson();
        json["price"] = this.price;
        if (this.dimensions !== null)   json["dimensions"] = this.dimensions.toJson();
        if (this.mass !== null)         json["mass"] = this.mass;
        if (this.lift !== null)         json["lift"] = this.lift;
        
        if (this.needs !== null) {
            json["needs"] = [];
            this.needs.forEach((obj) => {
                json["needs"].push(obj.toJson());
            });
        }
        
        return json;
    }
    
    // Only serialize defined fields (used for updating)
    toJsonWeak = function() {
        const json = {};

        if (this.name !== null)         json["name"] = this.name;
        if (this.reference !== null)    json["reference"] = this.reference;
        if (this.description !== null)  json["description"] = this.description;
        if (this.variety !== null)      json["variety"] = this.variety;
        if (this.color !== null)        json["color"] = this.color.toJson();
        if (this.price !== null)        json["price"] = this.price;
        if (this.dimensions !== null)   json["dimensions"] = this.dimensions.toJson();
        if (this.mass !== null)         json["mass"] = this.mass;
        if (this.lift !== null)         json["lift"] = this.lift;
        
        if (this.needs !== null) {
            json["needs"] = [];
            this.needs.forEach((obj) => {
                json["needs"].push(obj.toJson());
            });
        }
        
        return json;
    }
    
    static fromJson = function(json) {
        const object = new ModelPost;

        object.name = json["name"];
        object.reference = json["reference"];
        object.description = json["description"];
        object.variety = json["variety"];
        object.color = json["color"] ? Color.fromJson(json["color"]) : null;
        object.price = json["price"];
        object.dimensions = json["dimensions"] ? Dimensions.fromJson(json["dimensions"]) : null;
        object.mass = json["mass"];
        object.lift = json["lift"];
        
        if (json["needs"] !== null) {
            object.needs = [];
            json["needs"].forEach((entry) => {
                object.needs.push(NeedPost.fromJson(entry));
            });
        }

        return object;
    }
}

module.exports = ModelPost;