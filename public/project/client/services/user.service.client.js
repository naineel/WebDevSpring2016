(function (){
    angular
        .module("OmdbApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            login : login,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser,
            logout: logout,
            registerUser : registerUser,
            getProfile : getProfile,
            updateUser : updateUser,
            findUserByUsername : findUserByUsername,
            findUserByCredentialsP : findUserByCredentialsP,
            addProjectToUser : addProjectToUser,
            removeProjectFromUser : removeProjectFromUser,
            addExperienceToUser : addExperienceToUser,
            removeExperienceFromUser : removeExperienceFromUser,
            addEducationToUser : addEducationToUser,
            removeEducationFromUser : removeEducationFromUser,
            findUserById : findUserById,
            search : search,
            updateProfilePicture : updateProfilePicture,
            updateStartupLogo : updateStartupLogo
        };
        return api;

        function login(user) {
            console.log("In Client/service/UserService: credentials=" + user);
            return $http.post("/api/project/login", user);
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
            return $http.post("/api/project/register", user);
        }

        function getProfile(userId) {
            return $http.get("/api/project/profile/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/profile/" + userId, user);
        }

        function findUserByCredentialsP(username, password)
        {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);

        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);
        }

        function addProjectToUser(userId, project) {
            return $http.put("/api/project/profile/" + userId + "/project", project);
        }

        function removeProjectFromUser(userId, projectId) {
            return $http.delete("/api/project/profile/" + userId + "/project/" + projectId);
        }

        function addExperienceToUser(userId, experience) {
            return $http.put("/api/project/profile/" + userId + "/experience", experience);
        }

        function removeExperienceFromUser(userId, experienceId) {
            return $http.delete("/api/project/profile/" + userId + "/experience/" + experienceId);
        }

        function addEducationToUser(userId, education) {
            return $http.put("/api/project/profile/" + userId + "/education", education);
        }

        function removeEducationFromUser(userId, educationId) {
            return $http.delete("/api/project/profile/" + userId + "/education/" + educationId);
        }

        function findUserById(userid) {
            return $http.get("/api/project/user?userId=" + userid);
        }

        function search(searchText) {
            return $http.get("/api/project/search/" + searchText);
        }

        function updateProfilePicture(userId, file) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.post('/api/project/user/profilePic/' + userId, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }

        function updateStartupLogo(userId, file) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.post('/api/project/user/logo/' + userId, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }
    }

})();