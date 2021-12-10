/****************************************************************
 * The object representing a login request.
 ****************************************************************/

class LoginRequest {
    username;
    password;
    
    static fromJson = function(json) {
        const object = LoginRequest;
        object.username = json["username"];
        object.password = json["password"];
        return object;
    }
}

module.exports = LoginRequest;