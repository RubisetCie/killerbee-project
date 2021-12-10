/****************************************************************
 * Collection of utils functions 
 ****************************************************************/

// Importing the ApiError exception class
const ApiError = require("../exception/apiError");

// Handle exceptions caught in during a request
module.exports.handleError = function(err, res, action) {
    if (err instanceof ApiError) {
        console.error("Exception caught in the following request : " + action, err);
        res.status(err.code).send(err.message);
    } else {
        console.error("Unexpected exception caught in the following request : " + action, err);
        res.status(500).send(err.message);
    }
};