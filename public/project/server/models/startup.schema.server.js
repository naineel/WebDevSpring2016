/**
 * Created by naineel on 4/13/16.
 */
module.exports = function (mongoose) {
    var JobSchema = require("./job.schema.server.js")(mongoose);
    var StartupSchema = mongoose.Schema({
        video_url: String,
        high_concept: String,
        company_url: String,
        product_desc: String,
        locations: [String],
        markets: [String],
        jobs: [JobSchema],
        name: String,
        roles: [String],
        comments: [String]
    }, {
        collection: 'startup'
    });
    return StartupSchema;
};