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
            //getLoggedInUser : getLoggedInUser,
            deleteSession : deleteSession,
            login : login,
            register : register
        };

        return service;

        function findUsersByCredentialsA(username, password)
        {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);

        }

        function findAllUsers()
        {
            return $http.get("/api/assignment/admin/user");
        }

        function createUserA(user)
        {
            return $http.post("/api/assignment/admin/user", user);
        }

        function deleteUserById(userid) {
            return $http.delete("/api/assignment/admin/user/" + userid);
        }

        function updateUserA(userId, user)
        {
            return $http.put("/api/assignment/admin/user/" + userId, user);
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

        //function getLoggedInUser() {
        //    return $http.get('/api/assignment/usersession');
        //}

        function deleteSession() {
            return $http.post('/api/assignment/logout');
        }

        function login(user) {
            return $http.post('/api/assignment/login', user);
        }

        function register(user) {
            return $http.post('/api/assignment/register', user);
        }

    }
})();
