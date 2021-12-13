/****************************************************************
 * The object representing a model query.
 ****************************************************************/

class ModelQuery {
    name;
    reference;
    variety;
    
    static fromJson = function(json) {
        const object = ModelQuery;
        object.name = json["name"];
        object.reference = json["reference"];
        object.variety = json["variety"];
        return object;
    }
}

module.exports = ModelQuery;