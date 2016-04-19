/**
 * Created by naineel on 4/18/16.
 */

module.exports = function(mongoose) {

    var CommentSchema = require("./comment.schema.server.js")(mongoose);

    var CommentModel = mongoose.model('comment', CommentSchema);

    //var StartupModel = StartupModel.getMongooseModel();
    //var UserModel = UserModel.getMongooseModel();

    var api = {
        addCommentToUserComments: addCommentToUserComments,
        findCommentByStartupId : findCommentByStartupId,
        deleteCommentById : deleteCommentById
    };

    return api;

    function addCommentToUserComments(comment) {
        return CommentModel.create(comment);
    }

    function findCommentByStartupId(startupId) {
        return CommentModel.find({startupId : startupId});
    }

    function deleteCommentById(commentId) {
        return CommentModel.remove({_id: commentId});
    }

};