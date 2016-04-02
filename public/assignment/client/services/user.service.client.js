/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var service = {
            findUserByCredentialsA : findUsersByCredentialsA,
            findAllUsers : findAllUsers,
            createUserA : createUserA,
            deleteUserById : deleteUserById,
            updateUserA : updateUserA,
            getCurrentUser : getCurrentUser,
            setCurrentUserA : setCurrentUserA,
            findUserByUsername : findUserByUsername,
            getLoggedInUser : getLoggedInUser,
            deleteSession : deleteSession
        };

        return service;

        function findUsersByCredentialsA(username, password)
        {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);

        }

        function findAllUsers()
        {
            return $http.get("/api/assignment/user");
        }

        function createUserA(user)
        {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userid) {
            return $http.delete("/api/assignment/user/" + userid);
        }

        function updateUserA(userId, user)
        {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function getCurrentUser() {
            return $rootScope.newUser;
        }

        function setCurrentUserA (user) {
            $rootScope.newUser = user;
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function getLoggedInUser() {
            return $http.get('/api/assignment/usersession');
        }

        function deleteSession() {
            return $http.delete('/api/assignment/usersession');
        }

    }
})();
