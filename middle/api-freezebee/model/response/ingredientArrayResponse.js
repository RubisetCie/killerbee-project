/****************************************************************
 * The object representing an ingredient array response.
 ****************************************************************/

class IngredientArrayResponse {
    ingredients = [];   // Reference to an array of IngredientResponse objects
    
    toJson = function() {
        const json = {};
        
        json["ingredients"] = [];
        this.ingredients.forEach((obj) => {
            json["ingredients"].push(obj.toJson());
        });

        return json;
    }
}

module.exports = IngredientArrayResponse;