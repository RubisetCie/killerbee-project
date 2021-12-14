/****************************************************************
 * The controller associated to ingredient requests.
 ****************************************************************/

// External modules
const ObjectID = require("mongodb").ObjectID;

// Internal modules
const service = require("../service/ingredientService");

// Utils functions
const handleError = require("../utils/apiUtils").handleError;

// Model classes
const Ingredient = require("../model/ingredient");
const IngredientPost = require("../model/request/ingredientPost");
const DefaultTextQuery = require("../model/request/defaultTextQuery");

// Exception class
const ApiError = require("../exception/apiError");

// Create new ingredient data
module.exports.post = function(req, res) {
    try {
        // Paramters verification
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        const request = Ingredient.fromJson(req.body);
        
        request.check();
        service.post(request).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "ingredientController.post");
        });
    } catch (err) {
        handleError(err, res, "ingredientController.post");
    }
};

// Retrieve all ingredient data
module.exports.get = function(_, res) {
    try {
        service.get().then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "ingredientController.get");
        });
    } catch (err) {
        handleError(err, res, "ingredientController.get");
    }
};

// Retrieve ingredient data by ID
module.exports.getById = function(req, res) {
    try {
        const id = req.params.id ? new ObjectID(req.params.id) : null;

        // Paramters verification
        if (!id)
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.getById(id).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "ingredientController.getById");
        });
    } catch (err) {
        handleError(err, res, "ingredientController.getById");
    }
};

// Retrieve ingredient data by query
module.exports.getQuery = function(req, res) {
    try {
        // Paramters verification
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        service.getQuery(DefaultTextQuery.fromJson(req.body)).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "ingredientController.getQuery");
        });
    } catch (err) {
        handleError(err, res, "ingredientController.getQuery");
    }
};

// Update ingredient data by ID
module.exports.putById = function(req, res) {
    try {
        const id = req.params.id ? new ObjectID(req.params.id) : null;

        // Paramters verification
        if (!id)
            throw new ApiError("Parameter not recognized: id", 400);
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        const request = IngredientPost.fromJsonWeak(req.body);

        request.checkWeak();
        service.putById(id, request).then(() => {
            res.status(204).send();
        }).catch((error) => {
            handleError(error, res, "ingredientController.putById");
        });
    } catch (err) {
        handleError(err, res, "ingredientController.putById");
    }
};

// Delete ingredient data by ID
module.exports.deleteById = function(req, res) {
    try {
        const id = req.params.id ? new ObjectID(req.params.id) : null;

        // Paramters verification
        if (!id)
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.deleteById(id).then(() => {
            res.status(204).send();
        }).catch((error) => {
            handleError(error, res, "ingredientController.deleteById");
        });
    } catch (err) {
        handleError(err, res, "ingredientController.deleteById");
    }
};
