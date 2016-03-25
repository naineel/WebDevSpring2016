module.exports = function(app) {
    var userModel = require("./models/user.model.server.js")();


    var startupModel = require("./models/startup.model.server.js")();

    var userService = require("./services/user.service.server.js")(app, userModel, startupModel);
    var startupService = require("./services/startup.service.server.js")(app, startupModel, userModel);
};