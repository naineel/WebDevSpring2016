/**
 * Created by naineel on 4/18/16.
 */
module.exports = function(mongoose) {

    var FollowSchema = require("./follow.schema.server.js")(mongoose);

    var FollowModel = mongoose.model('follow', FollowSchema);

    //var StartupModel = StartupModel.getMongooseModel();
    //var UserModel = UserModel.getMongooseModel();

    var api = {
        addFollow : addFollow,
        deleteFollow : deleteFollow,
        deleteFollowByUsername : deleteFollowByUsername,
        deleteFollowByUsernameAndStartupId : deleteFollowByUsernameAndStartupId,
        getFollowsForUsername : getFollowsForUsername,
        getFollowsForStartupId : getFollowsForStartupId
    };

    return api;

    function addFollow(follow) {
        return FollowModel.create(follow);
    }

    function deleteFollow(commentId) {
        return FollowModel.remove({_id: commentId});
    }

    function deleteFollowByUsername(username) {
        return FollowModel.remove({username: username});
    }

    function deleteFollowByUsernameAndStartupId(username, startupId) {
        console.log([username, startupId]);
        console.log("delete follow");
        return FollowModel.remove({username: username, startupId: startupId});
    }

    function getFollowsForUsername(username) {
        return FollowModel.find({username: username});
    }

    function getFollowsForStartupId(startupId) {
        return FollowModel.find({startupId: startupId});
    }

};