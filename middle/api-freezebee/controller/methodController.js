/****************************************************************
 * The controller associated to method requests.
 ****************************************************************/

// External modules
const ObjectID = require("mongodb").ObjectID;

// Internal modules
const service = require("../service/methodService");

// Utils functions
const handleError = require("../utils/apiUtils").handleError;

// Model classes
const MethodPost = require("../model/request/methodPost");
const DefaultTextQuery = require("../model/request/defaultTextQuery");

// Exception class
const ApiError = require("../exception/apiError");

// Create new method data
module.exports.post = function(req, res) {
    try {
        // Paramters verification
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        const request = MethodPost.fromJson(req.body);
        
        request.check();
        service.post(request).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "methodController.post");
        });
    } catch (err) {
        handleError(err, res, "methodController.post");
    }
};

// Retrieve all method data
module.exports.get = function(_, res) {
    try {
        service.get().then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "methodController.get");
        });
    } catch (err) {
        handleError(err, res, "methodController.get");
    }
};

// Retrieve method data by ID
module.exports.getById = function(req, res) {
    try {
        const id = req.params.id ? new ObjectID(req.params.id) : null;

        // Paramters verification
        if (!id)
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.getById(id).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "methodController.getById");
        });
    } catch (err) {
        handleError(err, res, "methodController.getById");
    }
};

// Retrieve method data by query
module.exports.getQuery = function(req, res) {
    try {
        // Paramters verification
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        service.getQuery(DefaultTextQuery.fromJson(req.body)).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "methodController.getQuery");
        });
    } catch (err) {
        handleError(err, res, "methodController.getQuery");
    }
};

// Update method data by ID
module.exports.putById = function(req, res) {
    try {
        const id = req.params.id ? new ObjectID(req.params.id) : null;

        // Paramters verification
        if (!id)
            throw new ApiError("Parameter not recognized: id", 400);
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        const request = MethodPost.fromJson(req.body);

        request.checkWeak();
        service.putById(id, request).then(() => {
            res.status(204).send();
        }).catch((error) => {
            handleError(error, res, "methodController.putById");
        });
    } catch (err) {
        handleError(err, res, "methodController.putById");
    }
};

// Delete method data by ID
module.exports.deleteById = function(req, res) {
    try {
        const id = req.params.id ? new ObjectID(req.params.id) : null;

        // Paramters verification
        if (!id)
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.deleteById(id).then(() => {
            res.status(204).send();
        }).catch((error) => {
            handleError(error, res, "methodController.deleteById");
        });
    } catch (err) {
        handleError(err, res, "methodController.deleteById");
    }
};
