/**
 * Created by naineel on 3/23/16.
 */
"use strict";
(function (){
    angular
        .module("FormBuilderApp")
        .factory("StartupService", StartupService);

    function StartupService($http) {
        var api = {
            renderDetails : renderDetails,
            searchStartup : searchStartup
        };

        return api;

        function renderDetails(startupId) {
            var startupById = "https://api.angel.co/1/startups/STARTUPID?access_token=5ea0e05d9bdb98611f02fdcf40448f6d3f346b2a6321a378&callback=JSON_CALLBACK";
            var startupJobs = "https://api.angel.co/1/startups/STARTUPID/jobs?access_token=5ea0e05d9bdb98611f02fdcf40448f6d3f346b2a6321a378&callback=JSON_CALLBACK";

            startupById = startupById.replace("STARTUPID", startupId);
            return $http.jsonp(startupById);
        }

        function searchStartup(searchString) {
            var SEARCH_URL = "https://api.angel.co/1/search?access_token=5ea0e05d9bdb98611f02fdcf40448f6d3f346b2a6321a378" +
                "&query=KEYWORD" +
                "&callback=JSON_CALLBACK";
            SEARCH_URL = SEARCH_URL.replace("KEYWORD", searchString);
            return $http.jsonp(SEARCH_URL);
        }
    }
})();