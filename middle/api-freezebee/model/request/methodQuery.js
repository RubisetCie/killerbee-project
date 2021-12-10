/****************************************************************
 * The object representing a method query.
 ****************************************************************/

class MethodQuery {
    name;
    
    static fromJson = function(json) {
        const object = MethodQuery;
        object.name = json["name"];
        return object;
    }
}

module.exports = MethodQuery;