/****************************************************************
 * The object representing an ingredient.
 ****************************************************************/

class Ingredient {
    id;
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
        
        json["id"] = this.id;
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
}

module.exports = Ingredient;