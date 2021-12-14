/****************************************************************
 * The service calling the model queries to the database.
 ****************************************************************/

// The associated connector
const connector = require("../connector/mongodb");

// Create new model data
module.exports.post = function(model) {
    return connector.insertModel(model);
};

// Retrieve all model data
module.exports.get = function() {
    return connector.selectModel();
};

// Retrieve model data by ID
module.exports.getById = function(id) {
    return connector.selectModelById(id);
};

// Retrieve model data by query
module.exports.getQuery = function(query) {
    return connector.selectModelByQuery(query);
};

// Update model data by ID
module.exports.putById = function(id, model) {
    return connector.updateModelById(id, model);
};

// Delete model data by ID
module.exports.deleteById = function(id) {
    return connector.deleteModelById(id);
};