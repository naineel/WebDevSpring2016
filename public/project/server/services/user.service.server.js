"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

module.exports = function(app, userModel, startupModel) {
  app.post("/api/project/login", passport.authenticate('local'), login);
  app.get("/api/project/loggedin", loggedin);
  app.post("/api/project/logout", logout);
  app.post("/api/project/user", createUser);
  app.get("/api/project/profile/:userId", profile);
  app.put("/api/project/profile/:userId", updateProfile);
  app.post('/api/project/register', register);
  app.put("/api/project/profile/:userId/project", addProject);
  app.delete("/api/project/profile/:userId/project/:projectId", removeProject);
  app.put("/api/project/profile/:userId/experience", addExperience);
  app.delete("/api/project/profile/:userId/experience/:expId", removeExperience);
  app.put("/api/project/profile/:userId/education", addEducation);
  app.delete("/api/project/profile/:userId/education/:eduId", removeEducation);
  app.get("/api/project/search/:search", search);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentialsReal({username: username, password: password})
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
            .findUserByIdP(user._id)
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


    function login(req,  res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        //console.log("user service server logOut method");
        req.logOut();
        console.log("Session destroyed!!");
        res.send(200);
    }

    function createUser(req, res) {
        console.log("Creating new user");
        var newUser = req.body;
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
            );
    }

    function profile(req, res) {
        console.log("profile function");
        var userId = req.params.userId;
        console.log("In server user service: " + userId);
        userModel
            .findUserByIdP(userId)
            .then(
                function (user) {
                    if (user.type == 'user') {
                        var startupIds = user.follows;
                        var startups = startupModel.findStartupsByStartupIds(startupIds);
                        user.followsStartups = startups;
                        res.json(user);
                    }
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateProfile(req, res) {
        var id = req.params.userId;
        var user = req.body;
        userModel.updateUser(id, user)
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
        //if (user) {
        //    res.json(user);
        //} else {
        //    res.json({Error: "User doesn't exist"})
        //}
    }

    function register(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsernameP(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.createUserP(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addProject(req, res) {
        var userId = req.params.userId;
        var project = req.body;
        userModel
            .createProjectInProfile(userId, project)
            .then(
                function (project) {
                    res.json(project);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeProject(req, res) {
        var userId = req.params.userId;
        var projectId = req.params.projectId;
        userModel
            .removeProjectFromProfile(userId, projectId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function addExperience(req, res) {
        var userId = req.params.userId;
        var exp = req.body;
        console.log('User add experience in server service');
        console.log(exp);
        userModel
            .createExperienceInProfile(userId, exp)
            .then(
                function (exp) {
                    res.json(exp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeExperience(req, res) {
        var userId = req.params.userId;
        var expId = req.params.expId;
        userModel
            .removeExperienceFromProfile(userId, expId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function addEducation(req, res) {
        var userId = req.params.userId;
        var edu = req.body;
        console.log('User add education in server service');
        console.log(edu);
        userModel
            .createEducationInProfile(userId, edu)
            .then(
                function (exp) {
                    res.json(exp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeEducation(req, res) {
        var userId = req.params.userId;
        var eduId = req.params.eduId;
        userModel
            .removeEducationFromProfile(userId, eduId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function search(req, res) {
        var search = req.params.search;
        console.log('Search string is on the next line');
        console.log(search);

        userModel
            .searchText(search)
            .then(
                function (search) {
                    console.log(search);
                    res.json(search);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};