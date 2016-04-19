/**
 * Created by naineel on 4/17/16.
 */
module.exports = function (mongoose) {
    var ProjectSchema = require("./userProject.schema.server.js")(mongoose);
    var ExperienceSchema = require("./userExperience.schema.server.js")(mongoose);
    var EducationSchema = require("./userEducation.schema.server.js")(mongoose);
    var StartupSchema = require("./startup.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        role: [String],
        about: String,
        linkedIn_url: String,
        facebook_url: String,
        github_url: String,
        stack_url: String,
        website_url: String,
        photo_url: String,
        birthday: Date,
        projects: [ProjectSchema],
        experience: [ExperienceSchema],
        education: [EducationSchema],
        achievement: String,
        location: [String],
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        }
    }, {
        collection: 'userDetail'
    });
    return UserSchema;
};