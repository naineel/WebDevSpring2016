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
            removeJobFromStartup : removeJobFromStartup,
            getAllJobs : getAllJobs,
            updateJobInStartup : updateJobInStartup
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

        function getAllJobs() {
            return $http.get('/api/project/jobsUnique/all');
        }

        function updateJobInStartup(jobId, job) {
            return $http.put('/api/project/jobs/' + jobId, job);
        }
    }
})();