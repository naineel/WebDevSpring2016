/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        console.log(users);

        var service = {
            findUserByCredentials : findUsersByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            getCurrentUser : getCurrentUser,
            setCurrentUser : setCurrentUser
        };

        return service;

        function findUsersByCredentials(username, password, callback)
        {
            for (var i=0;i<users.length;i++){
                var user = users[i];
                if (user.username == username && user.password == password) {
                    callback(user);
                }
            }

        }

        function findAllUsers(callback)
        {
            callback(users);
        }

        function createUser(user, callback)
        {
            user._id = (new Date).getTime();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userid, callback) {
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user._id == userid) {
                    users.remove(user);
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback)
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
            callback(user);
        }

        function getCurrentUser() {
            return $rootScope.newUser;
        }

        function setCurrentUser (user) {
            $rootScope.newUser = user;
        }

    }
})();
