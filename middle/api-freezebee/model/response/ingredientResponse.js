/****************************************************************
 * The object representing an ingredient response.
 ****************************************************************/

class IngredientResponse {
    id;
    ingredient; // Reference to an Ingredient object
    
    toJson = function() {
        const json = {};
        
        json["id"] = this.id;
        json["ingredient"] = this.ingredient ? this.ingredient.toJson() : null;

        return json;
    }
}

module.exports = IngredientResponse;