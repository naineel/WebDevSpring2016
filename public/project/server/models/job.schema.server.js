/**
 * Created by naineel on 4/17/16.
 */
module.exports = function (mongoose) {
    var JobSchema = mongoose.Schema({
        description: String,
        skills: [String],
        position: String,
        startupId: String
    }, {
        collection: 'job'
    });
    return JobSchema;
};