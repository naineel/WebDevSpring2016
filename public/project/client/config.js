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
            .when("/updateProfile", {
                templateUrl: "views/profile/updateUserprofile.view.html",
                controller: "UpdateUserProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/updateStartupProfile", {
                templateUrl: "views/details/updateStartupprofile.view.html",
                controller: "UpdateStartupProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/userProfile", {
                templateUrl: "views/profile/userprofile.view.html",
                controller: "userProfileController",
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
                controller: "RegisterStartupController",
                controllerAs: "model"
            })
            .when("/registerUser", {
                templateUrl: "views/register/registerUser.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/jobs", {
                templateUrl: "views/jobs/job.view.html",
                controller: "JobController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn : getLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function checkLoggedIn($q, $location, $rootScope, $http) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function (user)
        {
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/login');
            }
        });
        return deferred.promise;
    }

    function getLoggedIn($q, $http, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function(user)
        {
            if (user !== '0') {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });
        return deferred.promise;
    }

})();