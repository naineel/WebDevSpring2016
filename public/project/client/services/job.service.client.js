/**
 * Created by naineel on 4/19/16.
 */
(function () {
    angular
        .module("OmdbApp")
        .factory("JobService", JobService);

    function JobService($http) {

        var api = {
            addJobToStartup: addJobToStartup,
            getJobsByStartupId : getJobsByStartupId,
            removeJobFromStartup : removeJobFromStartup
        };

        return api;

        function addJobToStartup(job) {
            return $http.post('/api/project/jobs', job);
        }

        function getJobsByStartupId(startupId) {
            return $http.get('/api/project/jobs/' + startupId);
        }

        function removeJobFromStartup(job) {
            return $http.delete('/api/project/jobs/' + job._id);
        }
    }
})();