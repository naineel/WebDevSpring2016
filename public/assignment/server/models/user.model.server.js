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
        //var deferred = q.defer();

        return UserModel.findOne(
            {username: username});

        //    function(err, doc) {
        //        if (err) {
        //            deferred.reject(err);
        //        } else {
        //            deferred.resolve(doc);
        //        }
        //    }
        //);

        //return deferred.promise;
    }

    function findUserByCredentials(credentials) {
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
        //return UserModel.find();
    }

    function createUser(user)
    {
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
        //return UserModel.create(user);
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel
            .findByIdAndRemove(
                {_id: userId},
                function (err, users) {
                    if (!err) {
                        deferred.resolve(users);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
        //return UserModel.remove({_id: userId});
    }

    function updateUserA(userId, user)
    {   console.log("update user: " + userId);

        var deferred = q.defer();
        delete user._id;
        UserModel.update({_id: userId}, {$set: user},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {

        var deferred = q.defer();
        UserModel.findById(userId
             ,function(err, doc) {
           if (err) {
               deferred.reject(err);
           } else {
               deferred.resolve(doc);
           }
        });

        return deferred.promise;
    }

};