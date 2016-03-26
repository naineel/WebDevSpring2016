/**
 * Created by naineel on 3/25/16.
 */
module.exports = function(app, startupModel, userModel) {
  app.post("/api/project/user/:userId/startup/:startupId", userFollowsStartup);
  app.post("/api/project/startup", createStartup);

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
        //Don't duplicate entries
        if (!(startup.follows.indexOf(userId) >= 0)) {
            startup.follows.push(userId);
        }

        var user = userModel.findUserByIdP(userId);
        if(!user.follows) {
            user.follows = [];
        }
        
        //Don't duplicate entries
        if (!(user.follows.indexOf(startupId) >= 0)){
            user.follows.push(startupId);
        }
        console.log([userId, startupId, startup]);
        res.send(200);
    }

    function createStartup(req, res) {
        console.log("create Startup");
        var newStartup = startupModel.createStartup(req.body);
        req.session.currentUser = newStartup;
        res.json(newStartup);
    }

};