/**
 * Created by naineel on 3/25/16.
 */
(function(){
    angular
        .module("OmdbApp")
        .factory("StartupService", StartupService);

    function StartupService($http) {
        var api = {
            setUserFollowsStartup: setUserFollowsStartup,
            registerStartup : registerStartup
        };

        return api;

        function setUserFollowsStartup(userId, startup) {
            console.log([userId, startup]);
            return $http.post("/api/project/user/" + userId + "/startup/" + startup.id, startup);
        }

        function registerStartup(startup) {
            return $http.post("/api/project/startup", startup);
        }

    }
})();