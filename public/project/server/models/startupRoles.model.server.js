/**
 * Created by naineel on 4/18/16.
 */
var _ = require("lodash");
var q = require("q");

module.exports = function(mongoose) {

    var RolesSchema = require("./startupRoles.schema.server.js")(mongoose);

    var RolesModel = mongoose.model('role', RolesSchema);

    var api = {
        addRoleToStartup: addRoleToStartup,
        findRolesByStartupId : findRolesByStartupId,
        deleteRoleByRoleIdAndStartupId : deleteRoleByRoleIdAndStartupId,
        updateRole : updateRole
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

    function updateRole(roleId, role) {
        var deferred = q.defer();
        delete role._id;
        RolesModel.update(
            {_id: roleId},
            {$set: role},
            function (err, roles) {
                if (!err) {
                    deferred.resolve(roles);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

};