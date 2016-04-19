/**
 * Created by naineel on 4/18/16.
 */
(function () {
    angular
        .module("OmdbApp")
        .factory("CommentService", CommentService);

    function CommentService($http) {

        var api = {
            addCommentToStartup: addCommentToStartup,
            getCommentsByStartupId : getCommentsByStartupId,
            removeCommentFromStartup : removeCommentFromStartup
        };

        return api;

        function addCommentToStartup(comment) {
            return $http.post('/api/project/comments', comment);
        }

        function getCommentsByStartupId(startupId) {
            return $http.get('/api/project/comments/' + startupId);
        }

        function removeCommentFromStartup(comment) {
            return $http.delete('/api/project/comments/' + comment._id);
        }
    }
})();