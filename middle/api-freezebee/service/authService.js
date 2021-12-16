/****************************************************************
 * The service calling the main query to the database.
 ****************************************************************/

// Exception class
const ApiError = require("../exception/apiError");

// Active directory configuration
const ActiveDirectory = require("activedirectory");
const adConfig = {
    url: process.env.ACTIVEDIRECTORY_HOST,
    baseDN: process.env.ACTIVEDIRECTORY_BASEDN,
    timeout: 20000
};

const ad = new ActiveDirectory(adConfig);

// Authenticate a single user
module.exports.authenticateUser = async function(username, password) {
    return new Promise((resolve) => {
        ad.authenticate(username, password, function(err, auth) {
            if (err)
                throw err;
            
            if (auth) {
                // Creating the user response
                const response = {
                    username: username,
                    password: password,
                    // DBA: Database admin
                    // BCK: Back saving
                    // USR: Regular user
                };
                
                // Check the user's group
                ad.isUserMemberOf(username, "DBA", function(err, isMember) {
                    if (err)
                        throw err;
                    
                    if (isMember) {
                        response.role = "DBA";
                        resolve(response);
                    } else {
                        ad.isUserMemberOf(username, "BCK", function(err, isMember) {
                            if (err)
                                throw err;
                            
                            if (isMember)
                                response.role = "BCK";
                            else
                                response.role = "USR";

                            resolve(response);
                        });
                    }
                });
            } else {
                throw new ApiError("Authentication failed", 400);
            }
        });
    });
};
