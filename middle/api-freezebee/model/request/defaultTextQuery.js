/****************************************************************
 * The object representing a default search by text query.
 ****************************************************************/

class DefaultTextQuery {
    query;
    
    static fromJson = function(json) {
        const object = new DefaultTextQuery;
        object.query = json["query"];
        return object;
    }
}

module.exports = DefaultTextQuery;