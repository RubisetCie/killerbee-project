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
    
    static fromJson = function(json) {
        const object = new Step;
        object.description = json["description"];
        object.validation = json["validation"];
        return object;
    }
}

module.exports = Step;