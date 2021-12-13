/****************************************************************
 * The object representing an ingredient with the dosing.
 ****************************************************************/

const Ingredient = require("./color");

class Need {
    dosing;
    ingredient;     // Reference to an Ingredient object

    toJson = function() {
        const json = {};
        json["dosing"] = this.dosing;
        json["ingredient"] = this.ingredient ? this.ingredient.toJson() : null;
        return json;
    }
    
    static fromJson = function(json) {
        const object = Need;
        object.dosing = json["dosing"];
        object.ingredient = json["ingredient"] ? Ingredient.fromJson(json["color"]) : null;
        return object;
    }
}

module.exports = Need;