/****************************************************************
 * The object representing a color.
 ****************************************************************/

class Color {
    r;
    g;
    b;
    
    toJson = function() {
        const json = {};
        json["r"] = this.r;
        json["g"] = this.g;
        json["b"] = this.b;
        return json;
    }
    
    static fromJson = function(json) {
        const object = Color;
        object.r = json["r"];
        object.g = json["g"];
        object.b = json["b"];
        return object;
    }
}

module.exports = Color;