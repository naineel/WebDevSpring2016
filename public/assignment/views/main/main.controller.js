/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
        //console.log($location.url());
    }
})();
