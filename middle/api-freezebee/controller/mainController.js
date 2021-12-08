/****************************************************************
 * The controller associated to main requests.
 ****************************************************************/

// External modules
const ObjectID = require("mongodb").ObjectID;

// Internal modules
const service = require("../service/mainService");

// Utils functions
const handleError = require("../utils/apiUtils").handleError;

// Exception class
const ApiError = require("../exception/apiError");
