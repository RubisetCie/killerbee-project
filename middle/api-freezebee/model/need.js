/****************************************************************
 * The object representing an ingredient with the dosing.
 ****************************************************************/

const Ingredient = require("./color");

class Need {
    dosing;
    ingredient;     // Reference to an Ingredient object

    toJson = function() {
        const json = {};
        if (this.dosing)
            json["dosing"] = this.dosing;
        json["ingredient"] = this.ingredient ? this.ingredient.toJson() : null;
        return json;
    }
}

module.exports = Need;