/**
 * Created by naineel on 3/25/16.
 */
module.exports = function(app, startupModel, userModel) {
  app.post("/api/project/user/:userId/movie/:startupId", userFollowsStartup);

    function userFollowsStartup(req, res) {
        var startupOriginal = req.body;
        var userId = req.params.userId;
        var startupId = req.params.startupId;
        var startup = startupModel.findStartupByStartupId(startupId);
        if (!startup) {
            startup = startupModel.createStartup(startupOriginal);
        }
        if (!startup.follows) {
            startup.follows = [];
        }
        startup.follows.push(userId);

        var user = userModel.findUserById(userId);
        if(!user.follows) {
            user.follows = [];
        }
        user.follows.push(startupId);

        console.log([userId, startupId, startup]);
        res.send(200);
    }

};