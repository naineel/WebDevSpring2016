/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", mainController);

    function mainController($scope, $location, $rootScope) {
        $scope.$location = $location;
        //console.log($location.url());
        if ($location.url() === '/home') {
            $rootScope.showSidebar = false;
        }
    }
})();
