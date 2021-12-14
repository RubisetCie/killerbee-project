/****************************************************************
 * The object representing a need without external references.
 ****************************************************************/

const ObjectID = require("mongodb").ObjectID;

const { isUndefined } = require("../../utils/memUtils");

class NeedPost {
    dosing;
    ingredient;
    
    toJson = function() {
        const json = {};
        if (!isUndefined(this.dosing))
            json["dosing"] = this.dosing;
        json["ingredient"] = this.ingredient ? { "_id": new ObjectID(this.ingredient) } : null;
        return json;
    }
    
    static fromJson = function(json) {
        const object = new NeedPost;
        if (!isUndefined(json["dosing"]))
            object.dosing = json["dosing"];
        object.ingredient = json["ingredient"];
        return object;
    }
}

module.exports = NeedPost;