/****************************************************************
 * The object representing an ingredient query.
 ****************************************************************/

class IngredientQuery {
    name;
    brand;
    type;
    
    static fromJson = function(json) {
        const object = IngredientQuery;
        object.name = json["name"];
        object.brand = json["brand"];
        object.type = json["type"];
        return object;
    }
}

module.exports = IngredientQuery;