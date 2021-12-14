/****************************************************************
 * The object representing a dimensions.
 ****************************************************************/

const ApiError = require("../exception/apiError");

const { isUndefined } = require("../utils/memUtils");

class Dimensions {
    width;
    length;
    height;
    
    check = function() {
        if (isUndefined(this.width))    throw new ApiError("Missing mandatory parameter: color.width", 400);
        if (isUndefined(this.length))   throw new ApiError("Missing mandatory parameter: color.length", 400);
        if (isUndefined(this.height))   throw new ApiError("Missing mandatory parameter: color.height", 400);
    }
    
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