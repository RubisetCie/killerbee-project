/****************************************************************
 * The object representing an ingredient with the dosing.
 ****************************************************************/

const Ingredient = require("./color");

const { isUndefined } = require("../utils/memUtils");

class Need {
    dosing;
    ingredient;     // Reference to an Ingredient object

    toJson = function() {
        const json = {};
        if (!isUndefined(this.dosing))
            json["dosing"] = this.dosing;
        json["ingredient"] = this.ingredient ? this.ingredient.toJson() : null;
        return json;
    }
}

module.exports = Need;