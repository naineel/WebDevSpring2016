/**
 * Created by naineel on 4/18/16.
 */
module.exports = function(mongoose) {

    var RolesSchema = require("./startupRoles.schema.server.js")(mongoose);

    var RolesModel = mongoose.model('role', RolesSchema);

    var api = {
        addRoleToStartup: addRoleToStartup,
        findRolesByStartupId : findRolesByStartupId,
        deleteRoleByRoleIdAndStartupId : deleteRoleByRoleIdAndStartupId
    };

    return api;

    function addRoleToStartup(role) {
        return RolesModel.create(role);
    }

    function findRolesByStartupId(startupId) {
        return RolesModel.find({startupId : startupId});
    }

    function deleteRoleByRoleIdAndStartupId(roleId, startupId) {
        return RolesModel.remove({_id: roleId});
    }

};