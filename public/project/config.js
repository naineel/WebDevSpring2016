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
                templateUrl: "views/home/home.view.html"
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
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/details/:startupId", {
                templateUrl: "views/startup/startup.views.html",
                controller: "StartupDetailsController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/follow", {
                templateUrl: "views/follow/follow.view.html",
                controller: "FollowController"
            })
            .when("/comment", {
                templateUrl: "views/comment/comment.view.html",
                controller: "CommentController"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();