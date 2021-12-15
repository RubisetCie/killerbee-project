/****************************************************************
 * The controller associated to authentication requests.
 ****************************************************************/

// External modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Internal modules
const service = require("../service/authService");

// Utils functions
const handleError = require("../utils/apiUtils").handleError;

// Model classes
const LoginRequest = require("../model/request/loginRequest");
const LogoutRequest = require("../model/request/logoutRequest");
const TokenRequest = require("../model/request/tokenRequest");
const LoginResponse = require("../model/response/loginResponse");
const TokenResponse = require("../model/response/tokenResponse");
const ResponseError = require("../model/response/errorResponse");

// Exception class
const ApiError = require("../exception/apiError");

// Authentication constants
const ACCESSTOKENSECRET = process.env.AUTH_ACCESSTOKENSECRET;
const REFRESHTOKENSECRET = process.env.AUTH_REFRESHTOKENSECRET;
const TOKENEXPIRATION = process.env.AUTH_TOKENEXPIRATION || "20m";

// Store for the refresh tokens
var refreshTokens = [];

// User login
module.exports.login = function(req, res) {
    try {
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        const request = LoginRequest.fromJson(req.body);

        request.check();
        service.getByUsername(request.username).then(async function(user) {
            if (await bcrypt.compare(request.password, user.password)) {

                // Access token generation
                const accessToken = jwt.sign({
                    id: user.id,
                    username: user.username,
                    role: user.role
                }, ACCESSTOKENSECRET, { expiresIn: TOKENEXPIRATION });
                
                // Refresh token generation
                const refreshToken = jwt.sign({
                    id: user.id,
                    username: user.username,
                    role: user.usertype
                }, REFRESHTOKENSECRET);
                
                const response = new LoginResponse;
                
                refreshTokens.push(refreshToken);
                response.accessToken = accessToken;
                response.refreshToken = refreshToken;
                
                res.json(response.toJson());
            } else {
                throw new ApiError("Password mismatch", 400);
            }
        }).catch((error) => {
            handleError(error, res, "authController.login");
        });
    } catch (err) {
        handleError(err, res, "authController.login");
    }
};

// User logout
module.exports.logout = function(req, res) {
    try {
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        const request = LogoutRequest.fromJson(req.body);
        if (!request.token)
            throw new ApiError("Missing mandatory parameter: token", 400);
        
        // Remove refresh token from the store
        refreshTokens = refreshTokens.filter((t) => { t !== request.token; });

        res.status(204).send();
    } catch (err) {
        handleError(err, res, "authController.logout");
    }
};

// Generates new tokens based on the refresh tokens
module.exports.token = function(req, res) {
    try {
        if (!req.body)
            throw new ApiError("The request must come with a body", 400);
        
        const request = TokenRequest.fromJson(req.body);
        if (!request.token)
            throw new ApiError("Missing mandatory parameter: token", 400);
        
        // Check if the token is contained in the generated refresh token list
        if (!refreshTokens.includes(request.token))
            throw new ApiError("Wrong refresh token", 403);
        
        jwt.verify(request.token, REFRESHTOKENSECRET, (err, user) => {
            if (err)
                throw new ApiError("Wrong refresh token", 403);

            const accessToken = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.usertype
            }, ACCESSTOKENSECRET, { expiresIn: TOKENEXPIRATION });
            
            const response = new TokenResponse;
            response.accessToken = accessToken;

            res.json(response.toJson());
        });
    } catch (err) {
        handleError(err, res, "authController.token");
    }
};

// Middleware that handles authentication using JWT
module.exports.authenticate = function(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const bearer = authHeader.split(' ')[1]; // Get the bearer
            jwt.verify(bearer, ACCESSTOKENSECRET, (err) => {
                if (err)
                    throw new ApiError("Wrong access token", 403);

                next();
            });
        } else {
           throw new ApiError("An authorization is required for this request", 401);
        }
    } catch (err) {
        const response = new ResponseError;
        response.message = err.message;
        console.error("Authentication error : ", err);
        res.status(err instanceof ApiError ? err.code : 500).json(response.toJson());
    }
};