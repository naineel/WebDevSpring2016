/**
 * Created by naineel on 3/17/16.
 */
"use strict";
var users = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        findAllUsers : findAllUsers,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUser: updateUser,
        findUserById : findUserById,
        getCurrentUser : getCurrentUser,
        setCurrentUser : setCurrentUser
    };

    return api;

    function findUserByUsername(username) {
        var i;
        for (i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        var i;
        for (i = 0; i < users.length; i++) {
            if (users[i].username === credentials.username) {
                if (users[i].password === credentials.password) {
                    return users[i];
                }
            }
        }
        console.log("Did not find the user");
        return null;
    }

    function findAllUsers()
    {
        return users;
    }

    function createUser(user)
    {
        user._id = (new Date).getTime();
        users.push(user);
        return user;
    }

    function deleteUserById(userid) {
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user._id == userid) {
                users.remove(user);
            }
        }
        return users;
    }

    function updateUser(userId, user)
    {   console.log("update user: " + userId);

        for (var i = 0; i < users.length; i++) {
            var original_user = users[i];
            if (original_user._id == userId) {
                users[i].username = user.username;
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].password = user.password;
                users[i].roles = user.roles;
            }
        }
        console.log(users);
        return user;
    }

    function getCurrentUser() {
        return $rootScope.newUser;
    }

    function setCurrentUser (user) {
        $rootScope.newUser = user;
    }

    function findUserById(userId) {
        for (var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                return users[i];
            }
        }

        return null;
    }

};