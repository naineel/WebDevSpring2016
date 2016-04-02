/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function () {
   angular
       .module("FormBuilderApp")
       .controller("HeaderController", headerController);

    function headerController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            //$rootScope.newUser = null;
            UserService.setCurrentUserA(null);
            UserService.deleteSession();
            $location.url("/home");
        }

    }
})();