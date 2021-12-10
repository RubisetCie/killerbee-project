/****************************************************************
 * The object representing an error response.
 ****************************************************************/

class ErrorResponse {
    message;
    
    toJson = function() {
        const json = {};
        json["message"] = this.message;
        return json;
    }
}

module.exports = ErrorResponse;