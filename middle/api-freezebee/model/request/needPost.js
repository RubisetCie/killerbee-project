/****************************************************************
 * The object representing a need without external references.
 ****************************************************************/

const ObjectID = require("mongodb").ObjectID;

class NeedPost {
    dosing;
    ingredient;
    
    toJson = function() {
        const json = {};
        if (this.dosing !== null)
            json["dosing"] = this.dosing;
        json["ingredient"] = this.ingredient ? { "_id": new ObjectID(this.ingredient) } : null;
        return json;
    }
    
    static fromJson = function(json) {
        const object = new NeedPost;
        object.dosing = json["dosing"] ? json["dosing"] : null;
        object.ingredient = json["ingredient"];
        return object;
    }
}

module.exports = NeedPost;