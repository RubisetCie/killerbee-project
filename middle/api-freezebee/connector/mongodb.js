/****************************************************************
 * The connector to the MongoDB database.
 ****************************************************************/

// Mongo client
const MongoClient = require("mongodb").MongoClient;

// Model components
//! if (deployModel) {
const Model = require("../model/model");
const ModelResponse = require("../model/response/modelResponse");
const ModelArrayResponse = require("../model/response/modelArrayResponse");
const Need = require("../model/need");
//! }
//! if (deployMethod) {
const Method = require("../model/method");
//! }
//! if (deployIngredient) {
const Ingredient = require("../model/ingredient");
const IngredientResponse = require("../model/response/ingredientResponse");
const IngredientArrayResponse = require("../model/response/ingredientArrayResponse");
//! }

const InsertResponse = require("../model/response/insertResponse");

const ApiError = require("../exception/apiError");

const DATABASE = process.env.MONGO_DATABASE;

const client = new MongoClient(process.env.MONGO_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//! if (deployModel) {
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
//! }
//! if (deployIngredient) {
// Insert ingredient
module.exports.insertIngredient = function(ingredient) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        
        db.collection("ingredient").insertOne(ingredient.toJson(), function(err, result) {
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

// Select ingredient
module.exports.selectIngredient = function() {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = [
            {
                $sort: { _id: 1 }
            }
        ];
        
        db.collection("ingredient").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                const response = new IngredientArrayResponse;
                var count = 0;  // Counter for retrieved rows

                while (await result.hasNext())
                {
                    const res = await result.next();
                    const ingredient = new IngredientResponse;
                    
                    ingredient.id = res["_id"];
                    ingredient.ingredient = Ingredient.fromJson(res);
                    
                    response.ingredients.push(ingredient);
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

// Select ingredient by ID
module.exports.selectIngredientById = function(id) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);

        db.collection("ingredient").findOne({ _id: id }, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                if (!result)
                    throw new ApiError("Query returned nothing", 400);
                
                const ingredient = new IngredientResponse;
                
                ingredient.id = result["_id"];
                ingredient.ingredient = Ingredient.fromJson(result);
                
                console.log("Request finished");
                resolve(ingredient);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Select ingredient with a query
module.exports.selectIngredientByQuery = function(request) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = [
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
        
        db.collection("ingredient").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                const response = new IngredientArrayResponse;
                var count = 0;  // Counter for retrieved rows

                while (await result.hasNext())
                {
                    const res = await result.next();
                    const ingredient = new IngredientResponse;
                    
                    ingredient.id = res["_id"];
                    ingredient.ingredient = Ingredient.fromJson(res);
                    
                    response.ingredients.push(ingredient);
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

// Update ingredient by ID
module.exports.updateIngredientById = function(id, ingredient) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        db.collection("ingredient").updateOne({ _id: id }, {$set: ingredient.toJsonWeak()}, function(err, result) {
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

// Delete ingredient by ID
module.exports.deleteIngredientById = function(id) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        db.collection("ingredient").deleteOne({ _id: id }, function(err, result) {
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
//! }

// Connection
client.connect((err) => {
    if (err) {
        console.error("Error while connecting to MongoDB Database", err);
    } else {
        console.log("Connected to MongoDB Database");
    }
});