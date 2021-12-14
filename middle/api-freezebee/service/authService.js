/****************************************************************
 * The service calling the main query to the database.
 ****************************************************************/

// The associated connector
// TODO

// Retrieve a single user by username
module.exports.getByUsername = async function(username) {
    return new Promise((resolve) => {
        const result = {
            username: username,
            password: "$2y$10$LKhmvcn3p/KRTV2DvKDd/.FgTJvhLu5.0SVNo4gGekWOG0ecbedka",
            role: "DBA"
            // DBA: Database admin
            // BCK: Back saving
            // USR: Regular user
        };
        resolve(result);
    });
};
