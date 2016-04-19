/**
 * Created by naineel on 4/18/16.
 */
/**
 * Created by naineel on 4/18/16.
 */
'use strict';

module.exports = function(app, rolesModel) {

    app.post('/api/project/roles', addRoleToStartup);
    app.get('/api/project/roles/:startupId', getRolesByStartupId);
    app.delete('/api/project/roles/:roleId/startup/:startupId', deleteRoleFromStartup);

    function addRoleToStartup(req, res) {
        var role = req.body;
        console.log('In server side, add comment');
        rolesModel.addRoleToStartup(role)
            .then(
                function(roles) {
                    res.json(roles);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getRolesByStartupId(req, res) {
        var startupId = req.params.startupId;
        rolesModel.findRolesByStartupId(startupId)
            .then(
                function(roles) {
                    res.json(roles);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteRoleFromStartup(req, res) {
        var roleId = req.params.roleId;
        var startupId = req.params.startupId;
        rolesModel.deleteRoleByRoleIdAndStartupId(roleId, startupId)
            .then(
                function (role) {
                    res.json(role);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};