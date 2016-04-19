/**
 * Created by naineel on 4/18/16.
 */
'use strict';

module.exports = function(app, followModel) {

    app.post('/api/project/follows', addFollow);
    app.delete('/api/project/follows/:username', deleteFollowByUsername);
    app.delete('/api/project/follows/user/:username/startup/:startupId', deleteFollowByUsernameAndStartupId);
    app.get('/api/project/follows/user/:username', getFollowsByUsername);
    app.get('/api/project/follows/startup/:startupId', getFollowsByStartupId);

    function addFollow(req, res) {
        var follow = req.body;
        console.log('In server side, add comment');
        followModel.addFollow(follow)
            .then(
                function(follows) {
                    res.json(follows);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFollowByUsername(req, res) {
        var username = req.params.username;
        followModel.deleteFollowByUsername(username)
            .then(
                function (comment) {
                    res.json(comment);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFollowByUsernameAndStartupId(req, res) {
        var username = req.params.username;
        var startupId = req.params.startupId;
        followModel.deleteFollowByUsernameAndStartupId(username, startupId)
            .then(
                function (follow) {
                    res.json(follow);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFollowsByUsername(req, res) {
        var username = req.params.username;

        followModel.getFollowsForUsername(username)
            .then(
                function (follow) {
                    res.json(follow);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFollowsByStartupId(req, res) {
        var startupId = req.params.startupId;
        followModel.getFollowsForStartupId(startupId)
            .then(
                function (follow) {
                    res.json(follow);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};