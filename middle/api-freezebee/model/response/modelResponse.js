/****************************************************************
 * The object representing a model response.
 ****************************************************************/

class ModelResponse {
    id;
    model;      // Reference to a Model object
    
    toJson = function() {
        const json = {};
        
        json["id"] = this.id;
        json["model"] = this.model ? this.model.toJson() : null;

        return json;
    }
}

module.exports = ModelResponse;