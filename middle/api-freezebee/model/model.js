/****************************************************************
 * The object representing a freezebee model.
 ****************************************************************/

const Color = require("./color");
const Dimensions = require("./dimensions");
const Need = require("./need");
const ApiError = require("../exception/apiError");

class Model {
    name;
    reference;
    description;
    variety;
    color;          // Reference to a Color object
    price;
    dimensions;     // Reference to a Dimensions object
    mass;
    lift;
    needs;          // Reference to a list of Need objects

    check = function() {
        if (this.name === null)         throw new ApiError("Missing mandatory parameter: name", 400);
        if (this.reference === null)    throw new ApiError("Missing mandatory parameter: reference", 400);
        if (this.price === null)        throw new ApiError("Missing mandatory parameter: price", 400);
        
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

    static fromJson = function(json) {
        const object = new Model;

        object.name = json["name"];
        object.reference = json["reference"];
        if (json["description"] !== null)   object.description = json["description"];
        if (json["variety"] !== null)       object.variety = json["variety"];
        if (json["color"] !== null)         object.color = Color.fromJson(json["color"]);
        object.price = json["price"];
        if (json["dimensions"] !== null)    object.dimensions = Dimensions.fromJson(json["dimensions"]);
        if (json["mass"] !== null)          object.mass = json["mass"];
        if (json["lift"] !== null)          object.lift = json["lift"];

        return object;
    }
}

module.exports = Model;