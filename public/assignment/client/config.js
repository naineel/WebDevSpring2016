/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getLoggedInUser()
            .then(function (response){
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUserA(currentUser);
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
            .getLoggedInUser()
            .then(function (response) {
                var currentUser = response.data;
                UserService.setCurrentUserA(currentUser);
                deferred.resolve();
            });
        return deferred.promise;
    }

})();