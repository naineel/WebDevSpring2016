/**
 * Created by naineel on 3/18/16.
 */
module.exports = function(app, model) {
    app.post("/apt/assignment/user", createNewUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function getAllUsers(req, res) {
        if (req.query.username) {
            if(req.query.password) {
                getUserByCredentials(req, res);
            } else {
                getUserByUsername(req, res);
            }
        } else {
            res.json(model.findAllUsers());
        }
    }

    function getUserById(req, res) {
        var id = req.params.id;
        if (model.findUserById(id)) {
            res.json(model.findUserById(id))
        } else {
            res.json({Error: "User doesn't exist"});
        }
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        console.log("Username: " + username);
        var user = model.findUserByUsername(username);
        console.log("User: " + user);
        if (user) {
            res.json(model.findUserByUsername(username))
        } else {
            res.json({Error: "User doesn't exist"});
        }
    }

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        var credentials = {username: username, password: password};

        console.log(credentials);

        var user = model.findUserByCredentials(credentials);
        if (user) {
            res.json(user);
        } else {
            res.json({Error: "User doesn't exist"});
        }
    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        user = model.updateUser(id, user);
        if (user) {
            res.json(user);
        } else {
            res.json({Error: "User doesn't exist"})
        }

    }

    function deleteUserById(req, res) {
        var id = req.param.id;
        var users = model.deleteUserById(id);
        res.json(users);
    }

    function createNewUser(req, res) {
        var newUser = req.body;
        console.log("Current user: " + newUser);
        var allUsers = model.createUser(newUser);
        res.json(allUsers);
    }

};