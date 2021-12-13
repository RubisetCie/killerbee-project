/****************************************************************
 * The object representing the login response.
 ****************************************************************/

class LoginResponse {
    accessToken;
    refreshToken;
    
    toJson = function() {
        const json = {};
        json["accessToken"] = this.accessToken;
        json["refreshToken"] = this.refreshToken;
        return json;
    }
}

module.exports = LoginResponse;