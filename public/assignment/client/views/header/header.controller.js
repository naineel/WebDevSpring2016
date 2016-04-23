/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function () {
   angular
       .module("FormBuilderApp")
       .controller("HeaderController", headerController);

    function headerController($location, $rootScope, UserService) {
        var vm = this;
        vm.$location = $location;
        vm.logout = logout;

        function logout() {
            //$rootScope.newUser = null;
            UserService.setCurrentUserA(null);
            //UserService.deleteSession();
            UserService.logout();
            $location.url("/home");
        }

    }
})();