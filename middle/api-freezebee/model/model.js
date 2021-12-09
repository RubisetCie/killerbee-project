/****************************************************************
 * The object representing a freezebee model.
 ****************************************************************/

class Model {
    id;
    name;
    description;
    variety;
    color;              // Reference to a Color object
    price;
    dimensions;
    mass;
    lift;
    ingredients = [];   // Reference to a list of Need objects
    
    toJson = function() {
        const json = {};
        
        json["id"] = this.id;
        json["name"] = this.name;
        json["description"] = this.description;
        json["variety"] = this.variety;
        json["color"] = this.color ? this.color.toJson() : null;
        json["price"] = this.price;
        json["dimensions"] = this.dimensions;
        json["mass"] = this.mass;
        json["lift"] = this.lift;
        
        json["ingredients"] = [];
        this.ingredients.forEach((obj) => {
            json["ingredients"].push(obj.toJson());
        });
        
        return json;
    }
}

module.exports = Model;