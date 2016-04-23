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
                    verifyUserIsLoggedInAndAdmin: verifyUserIsLoggedInAndAdmin
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

    function checkLoggedIn($q, $location, $http, $rootScope) {
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
        return deferred.promise;
    }

    function getLoggedIn($q, $http, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/assignment/loggedin').then(function (response){
            if (response.data === '0') {
                delete $rootScope.newUser;
                deferred.resolve();
            } else {
                $rootScope.newUser = response.data;
                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    function verifyUserIsLoggedInAndAdmin(UserService, $q, $location, $rootScope) {
        var deferred = $q.defer();
        UserService.getLoggedInUser()
            .then(function (response) {
                if (response.data === '0') {
                    delete $rootScope.newUser;
                    deferred.reject();
                    $location.url("/");
                } else {
                    var user = response.data;
                    $rootScope.newUser = response.data;
                    if (user.roles.indexOf('admin') === -1) {
                        deferred.reject();
                        $location.url("/");
                    } else {
                        deferred.resolve();
                    }
                }
            });
        return deferred.promise;
    }


})();