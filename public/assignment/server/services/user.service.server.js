/**
 * Created by naineel on 3/18/16.
 */
"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {
    /*var auth = authorized;

    app.post("/api/assignment/admin/user", isAdmin, createNewUser);
    app.get("/api/assignment/admin/user", isAdmin, getAllUsers);
    app.get("/api/assignment/admin/user/:id", isAdmin, getUserById);
    app.put("/api/assignment/admin/user/:id", isAdmin, updateUserById);
    app.delete("/api/assignment/admin/user/:id", isAdmin, deleteUserById);

    app.get('/api/assignment/loggedin', getLoggedInUser);
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);
    app.put('/api/assignment/user/:id', auth, updateUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function authorized (req, res, next) {
        var user = req.user;
        console.log("Check user if admin");
        console.log(user.roles);
        if (!req.isAuthenticated()) {
            console.log("Not authenticated");
            res.send(401);
        } else {
            next();
        }
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
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
                    return done(err, null);
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

    function isAdmin(req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf("admin") === -1) {
            res.send(403);
        } else {
            next();
        }
    }

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
        var newUser = req.body;
        console.log("Trying to update user: " + newUser);
        if(req.user.roles.indexOf("admin") === -1) {
            delete newUser.roles;
        }

        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .findUserById(id)
            .then(
                function(user){
                    if(user && ((newUser.password === user.password) || (newUser.password === ''))) {
                        delete newUser.password;
                        return userModel.updateUserA(user._id, newUser);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.updateUserA(user._id, newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(stats){
                    res.send(200);
                },
                function(err){
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
            newUser.roles = ["student"];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    // if the user does not already exist
                    if (user == null) {
                        // create a new user
                        newUser.password = bcrypt.hashSync(newUser.password);
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
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
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

    function updateUser(req, res) {
        var newUser = req.body;
        if(req.user.roles.indexOf("admin") === -1) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .findUserById(req.params.id)
            .then(
                function(user){
                    if(user && ((newUser.password === user.password) || (newUser.password === ''))) {
                        delete newUser.password;
                        return userModel.updateUserA(user._id, newUser);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.updateUserA(user._id, newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(stats){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }*/

};