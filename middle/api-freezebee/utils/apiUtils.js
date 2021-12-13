/****************************************************************
 * Collection of utils functions 
 ****************************************************************/

// Importing the ApiError exception class
const ApiError = require("../exception/apiError");
const ResponseError = require("../model/response/errorResponse");

// Handle exceptions caught in during a request
module.exports.handleError = function(err, res, action) {
    const response = ResponseError;
    response.message = err.message;
    
    if (err instanceof ApiError) {
        console.error("Exception caught in the following request : " + action, err);
        res.status(err.code).json(response.toJson());
    } else {
        console.error("Unexpected exception caught in the following request : " + action, err);
        res.status(500).json(response.toJson());
    }
};