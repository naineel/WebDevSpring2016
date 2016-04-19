/**
 * Created by naineel on 4/18/16.
 */
(function () {
    angular
        .module("OmdbApp")
        .factory("FollowService", FollowService);

    function FollowService($http) {

        var api = {
            addFollow: addFollow,
            removeFollowByUsernameAndStartupId : removeFollowByUsernameAndStartupId,
            getFollowsForUsername : getFollowsForUsername,
            getFollowsForStartupId : getFollowsForStartupId
        };

        return api;

        function addFollow(follow) {
            return $http.post('/api/project/follows', follow);
        }

        function getFollowsForStartupId(startupId) {
            return $http.get('/api/project/follows/startup/' + startupId);
        }

        function removeFollowByUsernameAndStartupId(username, startupId) {
            return $http.delete('/api/project/follows/user/' + username + '/startup/' + startupId);
        }

        function getFollowsForUsername(username) {
            return $http.get('/api/project/follows/user/' + username);
        }
    }
})();