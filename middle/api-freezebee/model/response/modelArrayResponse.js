/****************************************************************
 * The object representing a model array response.
 ****************************************************************/

class ModelArrayResponse {
    models = [];    // Reference to an array of ModelResponse objects
    
    toJson = function() {
        const json = {};
        
        json["models"] = [];
        this.models.forEach((obj) => {
            json["models"].push(obj.toJson());
        });

        return json;
    }
}

module.exports = ModelArrayResponse;