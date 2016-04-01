/**
 * Created by naineel on 3/18/16.
 */
module.exports = function(app, uuid, db, mongoose) {
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var formModel = require("./models/form.model.server.js")(db, mongoose);
    var fieldModel = require("./models/field.model.server.js")(db, mongoose, formModel);
    var userService = require("./services/user.service.server.js")(app, userModel, uuid);
    var formService = require("./services/form.service.server.js")(app, formModel, uuid);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel, uuid);
};