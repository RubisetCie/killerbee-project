/****************************************************************
 * The object representing a freezebee model.
 ****************************************************************/

const Color = require("./color");
const Dimensions = require("./dimensions");
const Need = require("./need");

class Model {
    name;
    reference;
    description;
    variety;
    color;          // Reference to a Color object
    price;
    dimensions;
    mass;
    lift;
    needs = [];     // Reference to a list of Need objects
    
    toJson = function() {
        const json = {};

        json["name"] = this.name;
        json["reference"] = this.reference;
        json["description"] = this.description;
        json["variety"] = this.variety;
        json["color"] = this.color ? this.color.toJson() : null;
        json["price"] = this.price;
        json["dimensions"] = this.dimensions ? this.dimensions.toJson() : null;
        json["mass"] = this.mass;
        json["lift"] = this.lift;
        
        json["needs"] = [];
        this.ingredients.forEach((obj) => {
            json["needs"].push(obj.toJson());
        });
        
        return json;
    }
    
    static fromJson = function(json) {
        const object = Model;

        object.name = json["name"];
        object.reference = json["reference"];
        object.description = json["description"];
        object.variety = json["variety"];
        object.color = json["color"] ? Color.fromJson(json["color"]) : null;
        object.price = json["price"];
        object.dimensions = json["dimensions"] ? Dimensions.fromJson(json["dimensions"]) : null;
        object.mass = json["mass"];
        object.lift = json["lift"];
        
        if (json["needs"]) {
            json["needs"].forEach((entry) => {
                object.needs.push(Need.fromJson(entry));
            });
        }

        return object;
    }
}

module.exports = Model;