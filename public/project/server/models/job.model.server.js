/**
 * Created by naineel on 4/19/16.
 */
/**
 * Created by naineel on 4/18/16.
 */
var _ = require("lodash");
var q = require("q");
module.exports = function(mongoose) {

    var JobSchema = require("./job.schema.server.js")(mongoose);

    var JobModel = mongoose.model('job', JobSchema);

    var api = {
        addJobToStartup : addJobToStartup,
        deleteJobFromStartup : deleteJobFromStartup,
        getJobsForStartupId : getJobsForStartupId,
        getAllJobs : getAllJobs,
        updateJobById : updateJobById
    };

    return api;

    function addJobToStartup(job) {
        return JobModel.create(job);
    }

    function deleteJobFromStartup(jobId) {
        return JobModel.remove({_id: jobId});
    }

    function getJobsForStartupId(startupId) {
        return JobModel.find({startupId: startupId});
    }

    function getAllJobs() {
        console.log("Trying to find all jobs");
        return JobModel.find();
    }

    function updateJobById(jobId, job) {
        console.log(jobId);
        var deferred = q.defer();
        delete job._id;
        JobModel.update(
            {_id: jobId},
            {$set: job},
            function (err, job) {
                if (!err) {
                    deferred.resolve(job);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

};