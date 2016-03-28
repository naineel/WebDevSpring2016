/**
 * Created by naineel on 3/18/16.
 */
module.exports = function(app, uuid, db, mongoose) {
    var userModel = require("./models/user.model.js")(db, mongoose);
    var formModel = require("./models/form.model.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel, uuid);
    var formService = require("./services/form.service.server.js")(app, formModel, uuid);
    var fieldService = require("./services/field.service.server.js")(app, formModel, uuid);
};