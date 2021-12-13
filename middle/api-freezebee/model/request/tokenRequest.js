/****************************************************************
 * The object representing a refresh token request.
 ****************************************************************/

class TokenRequest {
    token;
    
    static fromJson = function(json) {
        const object = TokenRequest;
        object.token = json["token"];
        return object;
    }
}

module.exports = TokenRequest;