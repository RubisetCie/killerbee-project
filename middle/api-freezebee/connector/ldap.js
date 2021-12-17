/****************************************************************
 * The connector to the Active Directory server using LDAP.
 ****************************************************************/

// Exception class
const ApiError = require("../exception/apiError");

// LDAP client
const client = require("ldapjs").createClient({
    url: [process.env.ACTIVEDIRECTORY_HOST],
    timeout: 20000
});

// Authenticate a single user
module.exports.authenticateUser = async function(username, password) {
    return new Promise((resolve) => {
        // Searching for the user
        client.search("cn=Users", { filter: "(email=" + username + ")" }, function(err, res) {
            if (err)
                throw err;
            
            res.on('searchRequest', (searchRequest) => {
                console.log('searchRequest: ', searchRequest.messageID);
              });
              res.on('searchEntry', (entry) => {
                console.log('entry: ' + JSON.stringify(entry.object));
              });
              res.on('searchReference', (referral) => {
                console.log('referral: ' + referral.uris.join());
              });
              res.on('error', (err) => {
                console.error('error: ' + err.message);
              });
              res.on('end', (result) => {
                console.log('status: ' + result.status);
              });
              
              resolve(true);
            
            /*if (auth) {
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
            }*/
        });
    });
};

// Binding
client.bind(process.env.ACTIVEDIRECTORY_DN, "", (err) => {
    if (err)
        console.error("LDAP binding error", err);
    else
        console.log("LDAP successfully bound");
});

client.on("error", (err) => {
    console.error("LDAP error", err);
});
