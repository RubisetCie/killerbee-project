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
}

module.exports = Color;