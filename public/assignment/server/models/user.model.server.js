/**
 * Created by naineel on 3/17/16.
 */
"use strict";
//var users = require("./user.mock.json");

var q = require("q");

module.exports = function (db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        findAllUsers : findAllUsers,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUserA : updateUserA,
        findUserById : findUserById
    };

    return api;

    function findUserByUsername(username) {
        //var i;
        //for (i = 0; i < users.length; i++) {
        //    if (users[i].username === username) {
        //        return users[i];
        //    }
        //}
        //return null;
        var deferred = q.defer();

        UserModel.findOne(
            {username: username},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        //var i;
        //for (i = 0; i < users.length; i++) {
        //    if (users[i].username == credentials.username) {
        //        if (users[i].password == credentials.password) {
        //            return users[i];
        //        }
        //    }
        //}
        //console.log("Did not find the user");
        //return null;
        return UserModel.findOne(
            {username: credentials.username,
            password: credentials.password}
        );
    }

    function findAllUsers()
    {
        var deferred  = q.defer();
        UserModel.find(
            function (err, doc) {
                console.log("UserModel findAllUsers");
                console.log(doc);
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createUser(user)
    {
        //user._id = (new Date).getTime();
        //users.push(user);
        //return user;
        var deferred  = q.defer();
        UserModel.create(user,
            function(err, doc) {
            console.log("UserModel create");
            console.log(doc);
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUserById(userid) {
        //for (var i = 0; i < users.length; i++) {
        //    var user = users[i];
        //    if (user._id == userid) {
        //        users.remove(user);
        //    }
        //}
        //return users;
        var deferred = q.defer();
        UserModel
            .remove(
                {_id: userid},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function updateUserA(userId, user)
    {   console.log("update user: " + userId);

        //for (var i = 0; i < users.length; i++) {
        //    var original_user = users[i];
        //    if (original_user._id == userId) {
        //        users[i].username = user.username;
        //        users[i].firstName = user.firstName;
        //        users[i].lastName = user.lastName;
        //        users[i].password = user.password;
        //        users[i].roles = user.roles;
        //    }
        //}
        //console.log(users);
        //return user;
        var deferred = q.defer();
        delete user._id;
        UserModel
            .update (
                {_id: userId},
                {$set: user},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findUserById(userId) {
        //for (var i = 0; i < users.length; i++) {
        //    if(users[i]._id == userId) {
        //        return users[i];
        //    }
        //}

        var deferred = q.defer();
        UserModel.findById(userId, function(err, doc) {
           if (err) {
               deferred.reject(err);
           } else {
               deferred.resolve(doc);
           }
        });

        return deferred.promise;
    }

};