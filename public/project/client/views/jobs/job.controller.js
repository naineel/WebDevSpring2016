/**
 * Created by naineel on 4/21/16.
 */
(function(){
    angular
        .module("OmdbApp")
        .controller("JobController", JobController);

    function JobController(JobService, UserService) {
        var vm = this;

        function init() {
            console.log('INIT FUNCTION OF JOB');
            JobService.getAllJobs()
                .then (
                    function (response) {
                        console.log(response);
                        var properJobs = [];
                        var allJobs = response.data;
                        for (var i=0; i < allJobs.length; i++) {
                            (function(){
                                var job = allJobs[i];
                                UserService.getProfile(job.startupId)
                                    .then(function (resp) {
                                        var startup = resp.data;
                                        console.log('Get profile response');
                                        console.log(resp.data);
                                        job.startupName = startup.username;
                                        console.log('FInal job object');
                                        console.log(job);
                                        properJobs.push(job);
                                    }, function (err) {
                                        console.log(err);
                                    });
                            })();
                            vm.properJobs = properJobs;
                        }
                    }, function (err) {
                        console.log(err);
                        });
        }

        init();

    }
})();