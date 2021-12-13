/****************************************************************
 * The object representing API exception.
 ****************************************************************/

class ApiError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
    }
};

module.exports = ApiError;