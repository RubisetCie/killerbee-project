/****************************************************************
 * The service calling the main query to the database.
 ****************************************************************/

// The associated connector
//const connector = require("../connector/ldap");
const connector = require("../connector/mongodb");

// Authenticate a single user
module.exports.authenticateUser = function(username) {
    return connector.selectUserByUsername(username);
};
