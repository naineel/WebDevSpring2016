/**
 * Created by naineel on 4/13/16.
 */
module.exports = function (mongoose) {
    var ExperienceSchema = mongoose.Schema({
        title: String,
        description: String,
        startDate: Date,
        endDate: Date,
        employer: String
    }, {
        collection: 'experience'
    });
    return ExperienceSchema;
};