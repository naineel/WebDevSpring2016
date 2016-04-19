/**
 * Created by naineel on 4/13/16.
 */
module.exports = function (mongoose) {
    var ProjectSchema = mongoose.Schema({
        name: String,
        project_url: String,
        partners: [String],
        description: String,
        startDate: Date,
        endDate: Date,
        technologies: [String]
    }, {
        collection: 'project'
    });
    return ProjectSchema;
};