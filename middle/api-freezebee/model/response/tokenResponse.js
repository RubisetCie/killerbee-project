/****************************************************************
 * The object representing the refresh token response.
 ****************************************************************/

class TokenResponse {
    accessToken;
    
    toJson = function() {
        const json = {};
        json["accessToken"] = this.accessToken;
        return json;
    }
}

module.exports = TokenResponse;