/****************************************************************
 * The object representing a step in a method.
 ****************************************************************/

class Step {
    description;
    validation;
    
    toJson = function() {
        const json = {};
        
        json["description"] = this.description;
        json["validation"] = this.validation;
        
        return json;
    }
}

module.exports = Step;