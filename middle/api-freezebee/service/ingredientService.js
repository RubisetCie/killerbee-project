/****************************************************************
 * The service calling the ingredient queries to the database.
 ****************************************************************/

// The associated connector
const connector = require("../connector/mongodb");

// Create new ingredient data
module.exports.post = function(ingredient) {
    return connector.insertIngredient(ingredient);
};

// Retrieve all ingredient data
module.exports.get = function() {
    return connector.selectIngredient();
};

// Retrieve ingredient data by ID
module.exports.getById = function(id) {
    return connector.selectIngredientById(id);
};

// Retrieve ingredient data by query
module.exports.getQuery = function(query) {
    return connector.selectIngredientByQuery(query);
};

// Update ingredient data by ID
module.exports.putById = function(id, ingredient) {
    return connector.updateIngredientById(id, ingredient);
};

// Delete ingredient data by ID
module.exports.deleteById = function(id) {
    return connector.deleteIngredientById(id);
};