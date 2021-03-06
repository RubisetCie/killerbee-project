/****************************************************************
 * The object representing an ingredient.
 ****************************************************************/

const Color = require("./color");
const ApiError = require("../exception/apiError");

const { isUndefined } = require("../utils/memUtils");

class Ingredient {
    name;
    description;
    brand;
    type;
    color;          // Reference to a Color object
    price;
    density;
    young;
    
    check = function() {
        if (isUndefined(this.name))     throw new ApiError("Missing mandatory parameter: name", 400);
        if (isUndefined(this.type))     throw new ApiError("Missing mandatory parameter: type", 400);
        if (isUndefined(this.price))    throw new ApiError("Missing mandatory parameter: price", 400);
        
        if (!isUndefined(this.color))   this.color.check();
    }
    
    toJson = function() {
        const json = {};
        
        json["name"] = this.name;
        if (!isUndefined(this.description)) json["description"] = this.description;
        if (!isUndefined(this.brand))       json["brand"] = this.brand;
        json["type"] = this.type;
        if (!isUndefined(this.color))       json["color"] = this.color.toJson();
        json["price"] = this.price;
        if (!isUndefined(this.density))     json["density"] = this.density;
        if (!isUndefined(this.young))       json["young"] = this.young;
        
        return json;
    }
    
    static fromJson = function(json) {
        const object = new Ingredient;

        object.name = json["name"];
        if (!isUndefined(json["description"]))  object.description = json["description"];
        if (!isUndefined(json["brand"]))        object.brand = json["brand"];
        object.type = json["type"];
        if (!isUndefined(json["color"]))        object.color = Color.fromJson(json["color"]);
        object.price = json["price"];
        if (!isUndefined(json["density"]))      object.density = json["density"];
        if (!isUndefined(json["young"]))        object.young = json["young"];

        return object;
    }
}

module.exports = Ingredient;