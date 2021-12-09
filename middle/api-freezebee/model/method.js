/****************************************************************
 * The object representing a method to make a model.
 ****************************************************************/

class Method {
    id;
    name;
    description;
    steps = [];     // Reference to a list of Step objects
    
    toJson = function() {
        const json = {};
        
        json["id"] = this.id;
        json["name"] = this.name;
        json["description"] = this.description;
        
        json["steps"] = [];
        this.steps.forEach((str) => {
            json["steps"].push(str);
        });

        return json;
    }
}

module.exports = Method;