/**
 * Created by naineel on 3/25/16.
 */
"use strict";
(function (){
    angular
        .module("OmdbApp")
        .factory("AngelListService", AngelListService);

    function AngelListService($http) {
        var api = {
            renderDetailsReal : renderDetailsReal,
            searchStartupReal : searchStartupReal,
            findStartupRoles : findStartupRoles
        };

        return api;

        function renderDetailsReal(startupId) {
            var startupById = "https://api.angel.co/1/startups/STARTUPID?access_token=5ea0e05d9bdb98611f02fdcf40448f6d3f346b2a6321a378&callback=JSON_CALLBACK";
            startupById = startupById.replace("STARTUPID", startupId);
            console.log("Details Request: " + startupById);
            return $http.jsonp(startupById);
        }

        function searchStartupReal(searchString) {
            console.log("Search string: " + searchString);
            var SEARCH_URL = "https://api.angel.co/1/search?access_token=5ea0e05d9bdb98611f02fdcf40448f6d3f346b2a6321a378" +
                "&query=KEYWORD" +
                "&type=Startup" +
                "&callback=JSON_CALLBACK";
            SEARCH_URL = SEARCH_URL.replace("KEYWORD", searchString);
            return $http.jsonp(SEARCH_URL);
        }

        function findStartupRoles(startupId) {
            var startupById = "https://api.angel.co/1/startups/STARTUPID/roles?access_token=5ea0e05d9bdb98611f02fdcf40448f6d3f346b2a6321a378" +
                "&callback=JSON_CALLBACK";
            startupById = startupById.replace("STARTUPID", startupId);
            console.log("Startup roles: " + startupById);
            return $http.jsonp(startupById);
        }
    }
})();