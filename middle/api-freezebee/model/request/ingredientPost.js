/****************************************************************
 * The object representing an ingredient with weak references.
 ****************************************************************/

const Color = require("../color");
const ApiError = require("../../exception/apiError");

const { isUndefined } = require("../../utils/memUtils");

class IngredientPost {
    name;
    description;
    brand;
    type;
    color;          // Reference to a Color object
    price;
    density;
    young;
    
    checkWeak = function() {
        if (!isUndefined(this.color))   this.color.check();
    }
    
    // Only serialize defined fields (used for updating)
    toJsonWeak = function() {
        const json = {};
        
        if (!isUndefined(this.name))        json["name"] = this.name;
        if (!isUndefined(this.description)) json["description"] = this.description;
        if (!isUndefined(this.brand))       json["brand"] = this.brand;
        if (!isUndefined(this.type))        json["type"] = this.type;
        if (!isUndefined(this.color))       json["color"] = this.color.toJson();
        if (!isUndefined(this.price))       json["price"] = this.price;
        if (!isUndefined(this.density))     json["density"] = this.density;
        if (!isUndefined(this.young))       json["young"] = this.young;
        
        return json;
    }
    
    // Only deserialize defined fields (used for updating)
    static fromJsonWeak = function(json) {
        const object = new IngredientPost;

        if (!isUndefined(json["name"]))         object.name = json["name"];
        if (!isUndefined(json["description"]))  object.description = json["description"];
        if (!isUndefined(json["brand"]))        object.brand = json["brand"];
        if (!isUndefined(json["type"]))         object.type = json["type"];
        if (!isUndefined(json["color"]))        object.color = Color.fromJson(json["color"]);
        if (!isUndefined(json["price"]))        object.price = json["price"];
        if (!isUndefined(json["density"]))      object.density = json["density"];
        if (!isUndefined(json["young"]))        object.young = json["young"];

        return object;
    }
}

module.exports = IngredientPost;