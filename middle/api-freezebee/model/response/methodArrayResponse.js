/****************************************************************
 * The object representing a method array response.
 ****************************************************************/

class MethodArrayResponse {
    methods = [];   // Reference to an array of MethodResponse objects
    
    toJson = function() {
        const json = {};
        
        json["methods"] = [];
        this.methods.forEach((obj) => {
            json["methods"].push(obj.toJson());
        });

        return json;
    }
}

module.exports = MethodArrayResponse;