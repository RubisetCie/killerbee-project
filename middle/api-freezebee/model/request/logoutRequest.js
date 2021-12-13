/****************************************************************
 * The object representing a logout request.
 ****************************************************************/

class LogoutRequest {
    token;
    
    static fromJson = function(json) {
        const object = new LogoutRequest;
        object.token = json["token"];
        return object;
    }
}

module.exports = LogoutRequest;