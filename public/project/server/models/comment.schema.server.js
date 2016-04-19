/**
 * Created by naineel on 4/18/16.
 */
"use strict";
module.exports = function (mongoose) {

    var commentSchema = mongoose.Schema({
        username: String,
        comment: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        startupId: String
    }, {collection: 'comment'});

    return commentSchema;
};