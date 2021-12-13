/****************************************************************
 * The object representing a login request.
 ****************************************************************/

const ApiError = require("../../exception/apiError");

class LoginRequest {
    username;
    password;
    
    check = function() {
        if (this.username === null) throw new ApiError("Missing mandatory parameter: username", 400);
        if (this.password === null) throw new ApiError("Missing mandatory parameter: password", 400);
    }
    
    static fromJson = function(json) {
        const object = new LoginRequest;
        object.username = json["username"];
        object.password = json["password"];
        return object;
    }
}

module.exports = LoginRequest;