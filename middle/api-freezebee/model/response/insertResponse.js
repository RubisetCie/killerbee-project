/****************************************************************
 * The object representing an insert response.
 ****************************************************************/

class InsertResponse {
    insertedId;
    
    toJson = function() {
        const json = {};
        json["insertedId"] = this.insertedId;
        return json;
    }
}

module.exports = InsertResponse;