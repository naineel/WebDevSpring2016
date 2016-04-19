module.exports = function(app, db, mongoose) {
    var userModel = require("./models/user.model.server.js")(db, mongoose);


    var startupModel = require("./models/startup.model.server.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel, startupModel);
    var startupService = require("./services/startup.service.server.js")(app, startupModel, userModel);

    var CommentModel = require("./models/comment.model.server.js")(mongoose);

    var commentService = require("./services/comment.service.server.js")(app, CommentModel);

    var FollowModel = require("./models/follow.model.server.js")(mongoose);

    var followService = require("./services/follow.service.server.js")(app, FollowModel);

    var RolesModel = require("./models/startupRoles.model.server.js")(mongoose);
    var rolesService = require("./services/startupRoles.service.server.js")(app, RolesModel);

    var JobModel = require("./models/job.model.server.js")(mongoose);
    var jobService = require("./services/job.service.server.js")(app, JobModel);
};