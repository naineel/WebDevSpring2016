/**
 * Created by naineel on 4/19/16.
 */
/**
 * Created by naineel on 4/18/16.
 */
module.exports = function(mongoose) {

    var JobSchema = require("./job.schema.server.js")(mongoose);

    var JobModel = mongoose.model('job', JobSchema);

    var api = {
        addJobToStartup : addJobToStartup,
        deleteJobFromStartup : deleteJobFromStartup,
        getJobsForStartupId : getJobsForStartupId,
        getAllJobs : getAllJobs
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

};