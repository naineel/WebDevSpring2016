/**
 * Created by naineel on 3/25/16.
 */
module.exports = function(app, startupModel, userModel) {
  app.post("/api/project/user/:userId/startup/:startupId", userFollowsStartup);
  app.post("/api/project/startup", createStartup);

    function userFollowsStartup(req, res) {
        console.log("In userFollowsStartup Function");
        var startup = req.body;
        var userId = req.params.userId;
        var startupId = req.params.startupId;
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
        var newStartup = req.body;
        console.log(newStartup);
        //startupModel.createStartup(req.body);
        //req.session.currentUser = newStartup;
        //res.json(newStartup);

        startupModel
            .findStartupsByName(newStartup.name)
            .then(
                function (startup) {
                    if (startup) {
                        res.json(null);
                    } else {
                        return startupModel.createStartup(newStartup);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (startup) {
                    if (startup) {
                        req.login(startup, function (err) {
                           if (err) {
                               res.status(400).send(err);
                           } else {
                               res.json(startup);
                           }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};