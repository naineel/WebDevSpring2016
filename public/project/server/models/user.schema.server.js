/**
 * Created by naineel on 4/13/16.
 */
module.exports = function (mongoose) {
    var UserDetailsSchema = require("./userDetails.schema.server.js")(mongoose);
    var StartupDetailsSchema = require("./startup.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        type: String,
        userDetails: UserDetailsSchema,
        startupDetails: StartupDetailsSchema
    }, {
        collection: 'userp'
    });
    return UserSchema;
};