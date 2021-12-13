/****************************************************************
 * The object representing a color.
 ****************************************************************/

const ApiError = require("../exception/apiError");

class Color {
    r;
    g;
    b;
    
    check = function() {
        if (this.r === null)    throw new ApiError("Missing mandatory parameter: color.r", 400);
        if (this.g === null)    throw new ApiError("Missing mandatory parameter: color.g", 400);
        if (this.b === null)    throw new ApiError("Missing mandatory parameter: color.b", 400);
    }
    
    toJson = function() {
        const json = {};
        json["r"] = this.r;
        json["g"] = this.g;
        json["b"] = this.b;
        return json;
    }
    
    static fromJson = function(json) {
        const object = new Color;
        object.r = json["r"];
        object.g = json["g"];
        object.b = json["b"];
        return object;
    }
}

module.exports = Color;