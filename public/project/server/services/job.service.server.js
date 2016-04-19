/**
 * Created by naineel on 4/19/16.
 */
'use strict';

module.exports = function(app, jobModel) {

    app.post('/api/project/jobs', addJobToStartup);
    app.get('/api/project/jobs/:startupId', getJobsByStartupId);
    app.delete('/api/project/jobs/:jobId', deleteJobFromStartup);

    function addJobToStartup(req, res) {
        var job = req.body;
        console.log('In server side, add job');
        jobModel.addJobToStartup(job)
            .then(
                function(job) {
                    res.json(job);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getJobsByStartupId(req, res) {
        var startupId = req.params.startupId;
        jobModel.getJobsForStartupId(startupId)
            .then(
                function(jobs) {
                    res.json(jobs);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteJobFromStartup(req, res) {
        var jobId = req.params.jobId;
        jobModel.deleteJobFromStartup(jobId)
            .then(
                function (job) {
                    res.json(job);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};