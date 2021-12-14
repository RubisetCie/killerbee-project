/****************************************************************
 * The object representing a model without external references.
 ****************************************************************/

const Color = require("../color");
const Dimensions = require("../dimensions");
const NeedPost = require("./needPost");
const ApiError = require("../../exception/apiError");

const { isUndefined } = require("../../utils/memUtils");

class ModelPost {
    name;
    reference;
    description;
    variety;
    color;          // Reference to a Color object
    price;
    dimensions;     // Reference to a Dimensions object
    mass;
    lift;
    needs;          // Reference to a list of NeedPost objects
    
    check = function() {
        if (isUndefined(this.name))         throw new ApiError("Missing mandatory parameter: name", 400);
        if (isUndefined(this.reference))    throw new ApiError("Missing mandatory parameter: reference", 400);
        if (isUndefined(this.price))        throw new ApiError("Missing mandatory parameter: price", 400);
        
        if (!isUndefined(this.color))       this.color.check();
        if (!isUndefined(this.dimensions))  this.dimensions.check();
    }
    
    checkWeak = function() {
        if (!isUndefined(this.color))       this.color.check();
        if (!isUndefined(this.dimensions))  this.dimensions.check();
    }
    
    toJson = function() {
        const json = {};

        json["name"] = this.name;
        json["reference"] = this.reference;
        if (!isUndefined(this.description)) json["description"] = this.description;
        if (!isUndefined(this.variety))     json["variety"] = this.variety;
        if (!isUndefined(this.color))       json["color"] = this.color.toJson();
        json["price"] = this.price;
        if (!isUndefined(this.dimensions))  json["dimensions"] = this.dimensions.toJson();
        if (!isUndefined(this.mass))        json["mass"] = this.mass;
        if (!isUndefined(this.lift))        json["lift"] = this.lift;
        
        if (!isUndefined(this.needs)) {
            json["needs"] = [];
            this.needs.forEach((obj) => {
                json["needs"].push(obj.toJson());
            });
        }
        
        return json;
    }
    
    // Only serialize defined fields (used for updating)
    toJsonWeak = function() {
        const json = {};

        if (!isUndefined(this.name))        json["name"] = this.name;
        if (!isUndefined(this.reference))   json["reference"] = this.reference;
        if (!isUndefined(this.description)) json["description"] = this.description;
        if (!isUndefined(this.variety))     json["variety"] = this.variety;
        if (!isUndefined(this.color))       json["color"] = this.color.toJson();
        if (!isUndefined(this.price))       json["price"] = this.price;
        if (!isUndefined(this.dimensions))  json["dimensions"] = this.dimensions.toJson();
        if (!isUndefined(this.mass))        json["mass"] = this.mass;
        if (!isUndefined(this.lift))        json["lift"] = this.lift;
        
        if (!isUndefined(this.needs)) {
            json["needs"] = [];
            this.needs.forEach((obj) => {
                json["needs"].push(obj.toJson());
            });
        }
        
        return json;
    }
    
    static fromJson = function(json) {
        const object = new ModelPost;

        object.name = json["name"];
        object.reference = json["reference"];
        if (!isUndefined(json["description"]))  object.description = json["description"];
        if (!isUndefined(json["variety"]))      object.variety = json["variety"];
        if (!isUndefined(json["color"]))        object.color = Color.fromJson(json["color"]);
        object.price = json["price"];
        if (!isUndefined(json["dimensions"]))   object.dimensions = Dimensions.fromJson(json["dimensions"]);
        if (!isUndefined(json["mass"]))         object.mass = json["mass"];
        if (!isUndefined(json["lift"]))         object.lift = json["lift"];
        
        if (!isUndefined(json["needs"])) {
            object.needs = [];
            json["needs"].forEach((entry) => {
                object.needs.push(NeedPost.fromJson(entry));
            });
        }

        return object;
    }
    
    // Only deserialize defined fields (used for updating)
    static fromJsonWeak = function(json) {
        const object = new ModelPost;

        if (!isUndefined(json["name"]))         object.name = json["name"];
        if (!isUndefined(json["reference"]))    object.reference = json["reference"];
        if (!isUndefined(json["description"]))  object.description = json["description"];
        if (!isUndefined(json["variety"]))      object.variety = json["variety"];
        if (!isUndefined(json["color"]))        object.color = Color.fromJson(json["color"]);
        if (!isUndefined(json["price"]))        object.price = json["price"];
        if (!isUndefined(json["dimensions"]))   object.dimensions = Dimensions.fromJson(json["dimensions"]);
        if (!isUndefined(json["mass"]))         object.mass = json["mass"];
        if (!isUndefined(json["lift"]))         object.lift = json["lift"];
        
        if (!isUndefined(json["needs"])) {
            object.needs = [];
            json["needs"].forEach((entry) => {
                object.needs.push(NeedPost.fromJson(entry));
            });
        }

        return object;
    }
}

module.exports = ModelPost;