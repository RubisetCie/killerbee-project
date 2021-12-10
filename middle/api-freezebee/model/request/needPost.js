/****************************************************************
 * The object representing a need without external references.
 ****************************************************************/

class NeedPost {
    dosing;
    ingredientId;
    
    static fromJson = function(json) {
        const object = NeedPost;
        object.dosing = json["dosing"];
        object.ingredientId = json["ingredientId"];
        return object;
    }
}

module.exports = NeedPost;