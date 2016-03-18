/**
 * Created by naineel on 3/18/16.
 */
module.exports = function(app) {
    var userModel = require("./models/user.model")();
    var formModel = require("./models/form.model")();
    var userService = require("./services/user.service.server")(app, userModel);
    var formService = require("./services/form.service.server")(app, formModel);

};