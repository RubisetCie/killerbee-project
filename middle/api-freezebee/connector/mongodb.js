/****************************************************************
 * The connector to the MongoDB database.
 ****************************************************************/

// Mongo client
const MongoClient = require("mongodb").MongoClient;

// Model components
const Model = require("../model/model");
const Ingredient = require("../model/ingredient");
const Need = require("../model/need");

const InsertResponse = require("../model/response/insertResponse");
const ModelResponse = require("../model/response/modelResponse");
const ModelArrayResponse = require("../model/response/modelArrayResponse");

const ApiError = require("../exception/apiError");

const DATABASE = process.env.MONGO_DATABASE;

const client = new MongoClient(process.env.MONGO_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Insert model
module.exports.insertModel = function(model) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        
        db.collection("model").insertOne(model.toJson(), function(err, result) {
            try {
                if (err)
                    throw err;
                
                const response = new InsertResponse;
                response.insertedId = result["insertedId"];
                console.log(result["insertedCount"] + " rows inserted");
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Select model
module.exports.selectModel = function() {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = [
            {
                $lookup: {
                    from: "ingredient",
                    let: { ingredientId: "$needs.ingredient._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { "$in": [ "$_id", "$$ingredientId" ] }
                            }
                        },
                        {
                            $addFields: {
                                sort: { $indexOfArray: [ "$$ingredientId", "$_id" ]}
                            }
                        },
                        {
                            $sort: { "sort": 1 }
                        },
                        {
                            $addFields: { "sort": "$$REMOVE" }
                        }
                    ],
                    as: "lookup"
                }
            },
            {
                $sort: { _id: 1 }
            }
        ];
        
        db.collection("model").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                const response = new ModelArrayResponse;
                var count = 0;  // Counter for retrieved rows

                while (await result.hasNext())
                {
                    const res = await result.next();
                    const model = new ModelResponse;
                    
                    model.id = res["_id"];
                    model.model = Model.fromJson(res);
                    
                    // Deserializing the lookup result
                    if (res["needs"]) {
                        model.model.needs = [];
                        const len = res["needs"].length;
                        for (let i = 0; i < len; i++) {
                            const need = new Need;
                            need.ingredient = Ingredient.fromJson(res["lookup"][i]);
                            need.dosing = res["needs"][i]["dosing"];
                            model.model.needs.push(need);
                        }
                    }
                    
                    response.models.push(model);
                    count++;
                }
                
                console.log(count + " rows returned");
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Select model by ID
module.exports.selectModelById = function(id) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = [
            {
                $match: { _id: id }
            },
            {
                $lookup: {
                    from: "ingredient",
                    let: { ingredientId: "$needs.ingredient._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { "$in": [ "$_id", "$$ingredientId" ] }
                            }
                        },
                        {
                            $addFields: {
                                sort: { $indexOfArray: [ "$$ingredientId", "$_id" ]}
                            }
                        },
                        {
                            $sort: { "sort": 1 }
                        },
                        {
                            $addFields: { "sort": "$$REMOVE" }
                        }
                    ],
                    as: "lookup"
                }
            }
        ];
        
        db.collection("model").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                if (!await result.hasNext())
                    throw new ApiError("Query returned nothing", 400);
                
                const res = await result.next();
                const model = new ModelResponse;
                
                model.id = res["_id"];
                model.model = Model.fromJson(res);
                
                // Deserializing the lookup result
                if (res["needs"]) {
                    model.model.needs = [];
                    const len = res["needs"].length;
                    for (let i = 0; i < len; i++) {
                        const need = new Need;
                        need.ingredient = Ingredient.fromJson(res["lookup"][i]);
                        need.dosing = res["needs"][i]["dosing"];
                        model.model.needs.push(need);
                    }
                }
                
                console.log("Request finished");
                resolve(model);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Select model with a query
module.exports.selectModelByQuery = function(request) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = [
            {
                $lookup: {
                    from: "ingredient",
                    localField: "needs.ingredient._id",
                    foreignField: "_id",
                    as: "lookup"
                }
            },
            {
                $sort: { _id: 1 }
            }
        ];
        
        // Append the query if exists
        if (request.query) {
            query.unshift({
                $match: {
                    $text: { $search: request.query }
                }
            });
        }
        
        db.collection("model").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                const response = new ModelArrayResponse;
                var count = 0;  // Counter for retrieved rows

                while (await result.hasNext())
                {
                    const res = await result.next();
                    const model = new ModelResponse;
                    
                    model.id = res["_id"];
                    model.model = Model.fromJson(res);
                    
                    // Deserializing the lookup result
                    if (res["needs"]) {
                        model.model.needs = [];
                        const len = res["needs"].length;
                        for (let i = 0; i < len; i++) {
                            const need = new Need;
                            need.ingredient = Ingredient.fromJson(res["lookup"][i]);
                            need.dosing = res["needs"][i]["dosing"];
                            model.model.needs.push(need);
                        }
                    }
                    
                    response.models.push(model);
                    count++;
                }
                
                console.log(count + " rows returned");
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Update model by ID
module.exports.updateModelById = function(id, model) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        db.collection("model").updateOne({ _id: id }, {$set: model.toJsonWeak()}, function(err, result) {
            try {
                if (err)
                    throw err;
                
                const count = result["modifiedCount"];
                if (count <= 0) {
                    throw new ApiError("Query affected nothing", 400);
                }
                
                console.log(count + " rows modified");
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Delete model by ID
module.exports.deleteModelById = function(id) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        db.collection("model").deleteOne({ _id: id }, function(err, result) {
            try {
                if (err)
                    throw err;

                const count = result["deletedCount"];
                if (count <= 0) {
                    throw new ApiError("Query affected nothing", 400);
                }

                console.log(count + " rows deleted");
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Connection
client.connect((err) => {
    if (err) {
        console.error("Error while connecting to MongoDB Database", err);
    } else {
        console.log("Connected to MongoDB Database");
    }
});