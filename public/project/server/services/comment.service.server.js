/**
 * Created by naineel on 4/18/16.
 */
'use strict';

module.exports = function(app, commentModel) {

    app.post('/api/project/comments', addCommentToUserComments);
    app.get('/api/project/comments/:startupId', getCommentsByStartupId);
    app.delete('/api/project/comments/:commentId', deleteCommentFromStartup);

    function addCommentToUserComments(req, res) {
        var comment = req.body;
        console.log('In server side, add comment');
        commentModel.addCommentToUserComments(comment)
            .then(
                function(comments) {
                    res.json(comments);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getCommentsByStartupId(req, res) {
        var startupId = req.params.startupId;
        commentModel.findCommentByStartupId(startupId)
            .then(
                function(comments) {
                    res.json(comments);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteCommentFromStartup(req, res) {
        var commentId = req.params.commentId;
        commentModel.deleteCommentById(commentId)
            .then(
                function (comment) {
                    res.json(comment);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};