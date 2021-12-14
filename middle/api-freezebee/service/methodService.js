/****************************************************************
 * The service calling the method queries to the database.
 ****************************************************************/

// The associated connector
const connector = require("../connector/mongodb");

// Create new method data
module.exports.post = function(method) {
    return connector.insertMethod(method);
};

// Retrieve all method data
module.exports.get = function() {
    return connector.selectMethod();
};

// Retrieve method data by ID
module.exports.getById = function(id) {
    return connector.selectMethodById(id);
};

// Retrieve method data by query
module.exports.getQuery = function(query) {
    return connector.selectMethodByQuery(query);
};

// Update method data by ID
module.exports.putById = function(id, method) {
    return connector.updateMethodById(id, method);
};

// Delete method data by ID
module.exports.deleteById = function(id) {
    return connector.deleteMethodById(id);
};