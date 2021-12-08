/****************************************************************
 * The connector to the MongoDB database.
 ****************************************************************/

// Mongo client
const MongoClient = require("mongodb").MongoClient;

// Model components
// TODO

const ApiError = require("../exception/apiError");

const HOST = process.env.MONGO_HOST;
const DATABASE = process.env.MONGO_DATABASE;

const client = new MongoClient(HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connection
client.connect((err) => {
    if (err) {
        console.error("Error while connecting to MongoDB Database", err);
    } else {
        console.log("Connected to MongoDB Database");
    }
});