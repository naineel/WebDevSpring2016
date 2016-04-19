/**
 * Created by naineel on 4/13/16.
 */
module.exports = function (mongoose) {
    var EducationSchema = mongoose.Schema({
        university: String,
        major: String,
        yearGraduated: Date,
        degree: String,
        achievements: String
    }, {
        collection: 'education'
    });
    return EducationSchema;
};