/****************************************************************
 * The controller associated to model requests.
 ****************************************************************/

// External modules
const ObjectID = require("mongodb").ObjectID;

// Internal modules
const service = require("../service/modelService");

// Utils functions
const handleError = require("../utils/apiUtils").handleError;

// Exception class
const ApiError = require("../exception/apiError");

// Retrieve all model data
module.exports.get = function(_, res) {
    try {
        service.get().then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "modelController.get");
        });
    } catch (err) {
        handleError(err, res, "modelController.get");
    }
};

// Retrieve model data by ID
module.exports.getById = function(req, res) {
    try {
        const id = req.params.id ? new ObjectID(req.params.id) : null;

        // Paramters verification
        if (!id)
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.getById(id).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "modelController.getById");
        });
    } catch (err) {
        handleError(err, res, "modelController.getById");
    }
};

// Retrieve model data by name
module.exports.getByName = function(req, res) {
    try {
        const name = req.params.name ? new ObjectID(req.params.id) : null;

        // Paramters verification
        if (!id)
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.getById(id).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "modelController.getById");
        });
    } catch (err) {
        handleError(err, res, "modelController.getById");
    }
};
