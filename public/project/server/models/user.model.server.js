var users = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentialsReal : findUserByCredentialsReal,
        createUser : createUser,
        findUserByIdP : findUserByIdP
    };

    return api;

    function findUserByCredentialsReal(credentials) {
        console.log("In server/model/userModel: credentials123= " + credentials.username + " " + credentials.password);
        var i;
        for (i = 0; i < users.length; i++) {
            if (users[i].username === credentials.username) {
                if (users[i].password === credentials.password) {
                    console.log("Found User: " + users[i]);
                    return users[i];
                }
            }
        }
        console.log("Did not find the user returning NULL");
        return null;
    }

    function createUser(userDetails) {
        console.log("In model/UserModel createUser Function");
        console.log(userDetails);
        userDetails._id = (new Date).getTime().toString();
        users.push(userDetails);
        console.log(users);
        return userDetails;
    }

    function findUserByIdP(userId) {
        var i;
        for (i = 0; i < users.length; i++) {
            if (users[i]._id === userId) {
                console.log("Found User: " + users[i]);
                return users[i];
            }
        }
        console.log("Couldn't find the user");
        return null;
    }
};