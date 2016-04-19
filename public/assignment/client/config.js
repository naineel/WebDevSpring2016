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
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "adminController",
                controllerAs: "model",
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
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/"
            });
    }

    function checkLoggedIn(UserService, $q, $location, $http, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function (user)
        {
           if (user !== '0') {
               $rootScope.newUser = user;
               deferred.resolve();
           } else {
              deferred.reject();
               $location.url('/login');
           }
        });
        //UserService
        //    .getLoggedInUser()
        //    .then(function (response){
        //        var currentUser = response.data;
        //        if(currentUser) {
        //            UserService.setCurrentUserA(currentUser);
        //            deferred.resolve();
        //        } else {
        //            deferred.reject();
        //            $location.url("/home");
        //        }
        //    });
        return deferred.promise;
    }

    function getLoggedIn(UserService, $q, $http, $rootScope) {
        var deferred = $q.defer();
        //UserService
        //    .getLoggedInUser()
        //    .then(function (response) {
        //        var currentUser = response.data;
        //        UserService.setCurrentUserA(currentUser);
        //        deferred.resolve();
        //    });
        $http.get('/api/assignment/loggedin').success(function(user)
        {
            if (user !== '0') {
                $rootScope.newUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    }

})();