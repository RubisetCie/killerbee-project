/****************************************************************
 * The object representing an ingredient with the dosing.
 ****************************************************************/

class Need {
    ingredient;     // Reference to an of Ingredient object
    dosing;
    
    toJson = function() {
        const json = {};
        
        json["ingredient"] = this.ingredient ? this.ingredient.toJson() : null;
        json["dosing"] = this.dosing;
        
        return json;
    }
}

module.exports = Need;