/**
 * Created by naineel on 3/18/16.
 */
"use strict";
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var mongoose = require('mongoose');

module.exports = function(app, userModel) {
    var isAdmin = authorized;

    app.post("/api/assignment/admin/user", isAdmin, createNewUser);
    app.get("/api/assignment/admin/user", isAdmin, getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/admin/user/:id", isAdmin, updateUserById);
    app.delete("/api/assignment/admin/user/:id", isAdmin, deleteUserById);
    app.get('/api/assignment/loggedin', getLoggedInUser);
    //app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);


    //passport.use(new LocalStrategy(localStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    function authorized (req, res, next) {
        var user = req.user;
        console.log("Check user if admin");
        console.log(user.roles);
        if (!req.isAuthenticated()) {
            console.log("Not authenticated");
            res.send(403);
        } else if (!(user.roles.indexOf("admin") > -1)) {
            console.log("Not an admin");
            res.send(403);
        } else {
            next();
        }
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function getLoggedInUser(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        console.log("user service server logOut method");
        req.logOut();
        res.send(200);
    }

    //function isAdmin(user) {
    //    if (user.roles.indexOf("admin") > -1) {
    //        return true;
    //    }
    //    return false;
    //}

    function getAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then (
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function getUserById(req, res) {
        var id = req.params.id;
        var user = userModel.findUserById(id)
            .then(
                function (doc) {
                    res.json(doc);
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
        delete user.roles;
        if (typeof user.roles == "string") {
            user.roles = user.roles.split(",");
        }

        userModel
            .updateUserA(id, user)
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        userModel
            .deleteUserById(req.params.id)
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createNewUser(req, res) {
        var newUser = req.body;
        console.log("Creating new user: " + newUser);
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["user"];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    // if the user does not already exist
                    if (user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function (user) {
                                    return userModel.findAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(users) {
                    res.json(users);
                },
                function() {
                    res.status(400).send(err);
                }
            )

    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['user'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if (user) {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    //function deleteSession(req, res) {
    //    req.session.destroy();
    //    res.send(200);
    //}

};