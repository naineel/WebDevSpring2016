/**
 * Created by naineel on 4/18/16.
 */
(function () {
    angular
        .module("OmdbApp")
        .factory("RolesService", RolesService);

    function RolesService($http) {

        var api = {
            addRoleToStartup: addRoleToStartup,
            getRolesByStartupId : getRolesByStartupId,
            removeRoleFromStartup : removeRoleFromStartup
        };

        return api;

        function addRoleToStartup(role) {
            return $http.post('/api/project/roles', role);
        }

        function getRolesByStartupId(startupId) {
            return $http.get('/api/project/roles/' + startupId);
        }

        function removeRoleFromStartup(startupId, roleId) {
            return $http.delete('/api/project/roles/' + roleId + '/startup/' + startupId);
        }
    }
})();