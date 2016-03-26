(function (){
    angular
        .module("OmdbApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            findUserByCredentials : findUserByCredentials,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser,
            logout: logout,
            registerUser : registerUser,
            getProfile : getProfile,
            updateUser : updateUser
        };
        return api;

        function findUserByCredentials(credentials) {
            console.log("In Client/service/UserService: credentials=" + credentials);
            return $http.post("/api/project/login", credentials);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            console.log("Current User: " + $rootScope.currentUser);
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function registerUser(user) {
            return $http.post("/api/project/user", user);
        }

        function getProfile() {
            console.log($rootScope.currentUser._id);
            return $http.get("/api/project/profile/" + $rootScope.currentUser._id);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/profile/" + userId, user);
        }
    }

})();