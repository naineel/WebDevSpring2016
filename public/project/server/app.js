/**
 * Created by naineel on 3/23/16.
 */
module.exports = function(app) {
    var userModel = require("./models/user.model.server")();
    var startupModel = require("./models/startup.model.server")();

    var userService = require("./services/user.service.server.js")(app, userModel, startupModel);
}