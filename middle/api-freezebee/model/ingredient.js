/****************************************************************
 * The object representing an ingredient.
 ****************************************************************/

const Color = require("./color");

class Ingredient {
    name;
    description;
    brand;
    type;
    color;          // Reference to a Color object
    price;
    density;
    young;
    
    toJson = function() {
        const json = {};
        
        json["name"] = this.name;
        json["description"] = this.description;
        json["brand"] = this.brand;
        json["type"] = this.type;
        json["color"] = this.color ? this.color.toJson() : null;
        json["price"] = this.price;
        json["density"] = this.density;
        json["young"] = this.young;
        
        return json;
    }
    
    static fromJson = function(json) {
        const object = Ingredient;

        object.name = json["name"];
        object.description = json["description"];
        object.brand = json["brand"];
        object.type = json["type"];
        object.color = json["color"] ? Color.fromJson(json["color"]) : null;
        object.price = json["price"];
        object.density = json["density"];
        object.young = json["young"];

        return object;
    }
}

module.exports = Ingredient;