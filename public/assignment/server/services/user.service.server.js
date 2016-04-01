/**
 * Created by naineel on 3/18/16.
 */
module.exports = function(app, model) {
    app.post("/api/assignment/user", createNewUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getAllUsers);
    app.get("/api/assignment/user?username=username&password=password", getAllUsers);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function getAllUsers(req, res) {
        //model.findAllUsers()
        //    .then(
        //        function (users) {
        //            res.json (users);
        //        },
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    );
        if (req.query.username) {
            if (req.query.password) {
                var username = req.query.username;
                var password = req.query.password;

                var credentials = {username: username, password: password};

                model.findUserByCredentials(credentials)
                    .then(
                        function (user) {
                            res.json(user);
                        },
                        function (err) {
                            res.status(400).send(err);
                        }
                    );
            } else {
                model.findUserByUsername(req.query.username)
                    .then(
                        function (user) {
                            res.json(user);
                        },
                        function (err) {
                            res.status(400).send(err);
                        }
                    );
            }
        } else {
            res.json(model.findAllUsers());
        }
    }

    function getUserById(req, res) {
        var id = req.params.id;
        var user = model.findUserById(id)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
        //if (model.findUserById(id)) {
        //    res.json(model.findUserById(id))
        //} else {
        //    res.json({Error: "User doesn't exist"});
        //}
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        console.log("Username: " + username);
        model.findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        var credentials = {username: username, password: password};

        //console.log(credentials);
        //
        //var user = model.findUserByCredentials(credentials);
        //console.log("Find credentials from model: ");
        //console.log(user);
        //
        //if (user != null) {
        //    res.json(user);
        //    return;
        //}
        //
        //res.json({Error: "User doesn't exist"});

        model
            .findUserByCredentials(credentials)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        console.log("Trying to update user: " + user);
        model
            .updateUserA(id, user)
            .then(
                function (user) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var id = req.param.id;
        model
            .deleteUserById(id)
            .then(
                function (allUsers) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createNewUser(req, res) {
        var newUser = req.body;
        console.log("Current user: " + newUser);
        model
            .createUser(newUser)
            .then(
                function(users) {
                    // TODO
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

};