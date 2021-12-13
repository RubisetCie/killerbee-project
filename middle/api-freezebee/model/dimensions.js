/****************************************************************
 * The object representing a dimensions.
 ****************************************************************/

class Dimensions {
    width;
    length;
    height;
    
    toJson = function() {
        const json = {};
        json["width"] = this.width;
        json["length"] = this.length;
        json["height"] = this.height;
        return json;
    }
    
    static fromJson = function(json) {
        const object = new Dimensions;
        object.width = json["width"];
        object.length = json["length"];
        object.height = json["height"];
        return object;
    }
}

module.exports = Dimensions;