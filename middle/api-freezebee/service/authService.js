/****************************************************************
 * The service calling the main query to the database.
 ****************************************************************/

// The associated connector
// TODO

// Retrieve a single user by username
module.exports.getByUsername = function(username) {
    return {
        username: username,
        password: "0000",
        role: 0
    };
};
