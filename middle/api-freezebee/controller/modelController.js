/****************************************************************
 * The controller associated to model requests.
 ****************************************************************/

// External modules
const ObjectID = require("mongodb").ObjectID;

// Internal modules
const service = require("../service/modelService");

// Utils functions
const handleError = require("../utils/apiUtils").handleError;

// Model classes
const ModelPost = require("../model/request/modelPost");
const ModelQuery = require("../model/request/modelQuery");

// Exception class
const ApiError = require("../exception/apiError");

// Create new model data
module.exports.post = function(req, res) {
    try {
        // Paramters verification
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        const request = ModelPost.fromJson(req.body);
        
        if (!request.name)      throw new ApiError("Missing mandatory parameter: name", 400);
        if (!request.reference) throw new ApiError("Missing mandatory parameter: reference", 400);
        if (!request.price)     throw new ApiError("Missing mandatory parameter: price", 400);
        
        service.getQuery(request).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "modelController.post");
        });
    } catch (err) {
        handleError(err, res, "modelController.post");
    }
};

// Retrieve all model data
module.exports.get = function(res) {
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

// Retrieve model data by query
module.exports.getQuery = function(req, res) {
    try {
        // Paramters verification
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        service.getQuery(ModelQuery.fromJson(req.body)).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "modelController.getQuery");
        });
    } catch (err) {
        handleError(err, res, "modelController.getQuery");
    }
};

// Update model data by ID
module.exports.putById = function(req, res) {
    try {
        const id = req.params.id ? new ObjectID(req.params.id) : null;

        // Paramters verification
        if (!id)
            throw new ApiError("Parameter not recognized: id", 400);
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        const request = ModelPost.fromJson(req.body);
        
        if (!request.name)      throw new ApiError("Missing mandatory parameter: name", 400);
        if (!request.reference) throw new ApiError("Missing mandatory parameter: reference", 400);
        if (!request.price)     throw new ApiError("Missing mandatory parameter: price", 400);
        
        service.put(id, request).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "modelController.putById");
        });
    } catch (err) {
        handleError(err, res, "modelController.putById");
    }
};

// Delete model data by ID
module.exports.deleteById = function(req, res) {
    try {
        const id = req.params.id ? new ObjectID(req.params.id) : null;

        // Paramters verification
        if (!id)
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.deleteById(id).then(() => {
            res.status(204).send();
        }).catch((error) => {
            handleError(error, res, "modelController.deleteById");
        });
    } catch (err) {
        handleError(err, res, "modelController.deleteById");
    }
};
