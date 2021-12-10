/****************************************************************
 * The object representing a method response.
 ****************************************************************/

class MethodResponse {
    id;
    method;     // Reference to a Method object
    
    toJson = function() {
        const json = {};
        
        json["id"] = this.id;
        json["method"] = this.method ? this.method.toJson() : null;

        return json;
    }
}

module.exports = MethodResponse;