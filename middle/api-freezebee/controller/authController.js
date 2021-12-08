/****************************************************************
 * The controller associated to authentication requests.
 ****************************************************************/

// External modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Utils functions
const handleError = require("../utils/apiUtils").handleError;

// Exception class
const ApiError = require("../exception/apiError");

// Authentication constants
const ACCESSTOKENSECRET = process.env.AUTH_ACCESSTOKENSECRET;
const REFRESHTOKENSECRET = process.env.AUTH_REFRESHTOKENSECRET;
const TOKENEXPIRATION = process.env.AUTH_TOKENEXPIRATION || "20m";

var refreshTokens = [];

// User login
module.exports.login = function(req, res) {
    try {
        if (!req.body)
            throw new ApiError("Request body is undefined", 400);
        
        const email = req.body["email"];
        const password = req.body["password"];

        // Paramters verification
        if (!email)     throw new ApiError("Missing mandatory parameter: email", 400);
        if (!password)  throw new ApiError("Missing mandatory parameter: password", 400);
        
        service.getUserByEmail(email).then(async function(user) {
            if (await bcrypt.compare(password, user.password)) {
                // Access token generation
                const accessToken = jwt.sign({
                    id: user.id,
                    username: user.username,
                    role: user.usertype
                }, ACCESSTOKENSECRET, { expiresIn: TOKENEXPIRATION });
                
                // Refresh token generation
                const refreshToken = jwt.sign({
                    id: user.id,
                    username: user.username,
                    role: user.usertype
                }, REFRESHTOKENSECRET);
                
                refreshTokens.push(refreshToken);
                
                res.json({ accessToken, refreshToken });
            } else {
                res.status(400).send("Password mismatch");
            }
        }).catch((error) => {
            handleError(error, res, "logging in");
        });
    } catch (err) {
        handleError(err, res, "logging in");
    }
};

// User logout
module.exports.logout = function(req, res) {
    try {
        if (!req.body)
            throw new ApiError("Request body is undefined", 400);
        
        const token = req.body["token"];
        if (!token)
            throw new ApiError("Missing mandatory parameter: token", 401);
        
        refreshTokens = refreshTokens.filter((t) => { t !== token; });

        res.status(204).send();
    } catch (err) {
        handleError(err, res, "logging out");
    }
};

// Generates new tokens based on the refresh tokens
module.exports.token = function(req, res) {
    try {
        if (!req.body)
            throw new ApiError("Request body is undefined", 400);
        
        const token = req.body["token"];
        if (!token)
            throw new ApiError("Missing mandatory parameter: token", 401);
        
        // Check if the token is contained in the generated refresh token list
        if (!refreshTokens.includes(token))
            throw new ApiError("Wrong refresh token", 403);
        
        jwt.verify(token, REFRESHTOKENSECRET, (err, user) => {
            if (err)
                throw new ApiError("Wrong refresh token", 403);

            const accessToken = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.usertype
            }, ACCESSTOKENSECRET, { expiresIn: TOKENEXPIRATION });

            res.json({ accessToken });
        });
    } catch (err) {
        handleError(err, res, "refreshing token");
    }
};

// Middleware that handles authentication using JWT
module.exports.authentication = function(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const bearer = authHeader.split(' ')[1]; // Get the bearer
            jwt.verify(bearer, ACCESSTOKENSECRET, (err, token) => {
                if (err)
                    throw new ApiError("Wrong access token", 403);

                // Passing the token to the request
                req.token = token;
                
                // Continuing the route
                next();
            });
        } else {
           throw new ApiError("An authorization is required for this request", 401);
        }
    } catch (err) {
        console.error("Authentication error:", err);
        res.status(err instanceof ApiError ? err.code : 500).send(err.message);
    }
};