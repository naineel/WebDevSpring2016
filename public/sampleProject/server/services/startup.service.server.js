/**
 * Created by naineel on 3/25/16.
 */
module.exports = function(app, startupModel, userModel) {
  app.post("/api/project/user/:userId/startup/:startupId", userFollowsStartup);

    function userFollowsStartup(req, res) {
        console.log("In userFollowsStartup Function");
        var startupOriginal = req.body;
        var userId = req.params.userId;
        var startupId = req.params.startupId;
        var startup = startupModel.findStartupByStartupId(startupId);
        if (!startup) {
            console.log("Startup does not exist, creating one!");
            startup = startupModel.createStartup(startupOriginal);
        }
        if (!startup.follows) {
            startup.follows = [];
        }
        startup.follows.push(userId);

        var user = userModel.findUserByIdP(userId);
        if(!user.follows) {
            user.follows = [];
        }
        user.follows.push(startupId);

        console.log([userId, startupId, startup]);
        res.send(200);
    }

};