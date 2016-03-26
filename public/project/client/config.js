(function(){
    angular
        .module("OmdbApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchControllerReal",
                controllerAs: "model",
                resolve: {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/profile/userprofile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "views/register/registerUser.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/details/:startupId", {
                templateUrl: "views/details/startupdetails.view.html",
                controller: "StartupDetailsController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/registerStartup", {
                templateUrl: "views/register/registerStartup.view.html",
                //controller: "RegisterController",
                controller: "RegisterStartupController",
                controllerAs: "model"
            })
            .when("/registerUser", {
                templateUrl: "views/register/registerUser.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response){
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });
        return deferred.promise;
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });
        return deferred.promise;
    }

})();