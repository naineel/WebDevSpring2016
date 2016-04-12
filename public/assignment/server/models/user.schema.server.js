/**
 * Created by naineel on 3/28/16.
 */
"use strict";
module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String]
    }, {
        collection: 'user'
    });
    return UserSchema;
};