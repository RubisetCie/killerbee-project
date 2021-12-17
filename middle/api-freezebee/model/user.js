/****************************************************************
 * The object representing an user.
 ****************************************************************/

class User {
    id;
    email;
    username;
    password;
    role;
    
    toJson = function() {
        const json = {};
        json["email"] = this.email;
        json["username"] = this.username;
        json["password"] = this.password;
        json["role"] = this.role;
        return json;
    }
}

module.exports = User;