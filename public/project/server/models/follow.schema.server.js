/**
 * Created by naineel on 4/18/16.
 */
module.exports = function (mongoose) {
    var FollowSchema = mongoose.Schema({
        username: String,
        startupId: String
    }, {
        collection: 'follow'
    });
    return FollowSchema;
};