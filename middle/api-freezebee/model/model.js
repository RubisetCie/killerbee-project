/****************************************************************
 * The object representing a freezebee model.
 ****************************************************************/

const Color = require("./color");
const Dimensions = require("./dimensions");
const Need = require("./need");
const ApiError = require("../exception/apiError");

const { isUndefined } = require("../utils/memUtils");

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
        if (isUndefined(this.name))         throw new ApiError("Missing mandatory parameter: name", 400);
        if (isUndefined(this.reference))    throw new ApiError("Missing mandatory parameter: reference", 400);
        if (isUndefined(this.price))        throw new ApiError("Missing mandatory parameter: price", 400);
        
        if (!isUndefined(this.color))       this.color.check();
        if (!isUndefined(this.dimensions))  this.dimensions.check();
    }
    
    toJson = function() {
        const json = {};

        json["name"] = this.name;
        json["reference"] = this.reference;
        if (!isUndefined(this.description)) json["description"] = this.description;
        if (!isUndefined(this.variety))     json["variety"] = this.variety;
        if (!isUndefined(this.color))       json["color"] = this.color.toJson();
        json["price"] = this.price;
        if (!isUndefined(this.dimensions))  json["dimensions"] = this.dimensions.toJson();
        if (!isUndefined(this.mass))        json["mass"] = this.mass;
        if (!isUndefined(this.lift))        json["lift"] = this.lift;
        
        if (!isUndefined(this.needs)) {
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
        if (!isUndefined(json["description"]))  object.description = json["description"];
        if (!isUndefined(json["variety"]))      object.variety = json["variety"];
        if (!isUndefined(json["color"]))        object.color = Color.fromJson(json["color"]);
        object.price = json["price"];
        if (!isUndefined(json["dimensions"]))   object.dimensions = Dimensions.fromJson(json["dimensions"]);
        if (!isUndefined(json["mass"]))         object.mass = json["mass"];
        if (!isUndefined(json["lift"]))         object.lift = json["lift"];

        return object;
    }
}

module.exports = Model;