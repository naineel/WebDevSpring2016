/**
 * Created by naineel on 4/12/16.
 */
(function() {
    angular
        .module("startupApp", [])
        .config(configuration);

    function configuration() {
        console.log('config.js');
        //$routeProvider
        //    .when ("/home", {
        //        templateUrl: "views/home/home.view.html"
        //    })
        //    .otherwise({
        //        redirectTo: "/home"
        //    });
    }

    //function checkLoggedIn(UserService, $q, $location) {
    //    var deferred = $q.defer();
    //    UserService
    //        .getCurrentUser()
    //        .then(function (response){
    //            var currentUser = response.data;
    //            if(currentUser) {
    //                UserService.setCurrentUser(currentUser);
    //                deferred.resolve();
    //            } else {
    //                deferred.reject();
    //                $location.url("/home");
    //            }
    //        });
    //    return deferred.promise;
    //}
    //
    //function getLoggedIn(UserService, $q) {
    //    var deferred = $q.defer();
    //    UserService
    //        .getCurrentUser()
    //        .then(function (response) {
    //            var currentUser = response.data;
    //            UserService.setCurrentUser(currentUser);
    //            deferred.resolve();
    //        });
    //    return deferred.promise;
    //}

})();