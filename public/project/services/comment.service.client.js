'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('CommentService', CommentService);

    function CommentService() {
        var allComments = [
            {"_id": "1", "userId": 123, "comment": "Example comment 1", "dateCreated": ""},
            {"_id": "2", "userId": 123, "comment": "Example comment 2", "dateCreated": ""},
            {"_id": "3", "userId": 234, "comment": "Example comment 1", "dateCreated": ""}
        ];

        function createCommentForUser(userId, comment, callback) {
            var newComment = {
                "_id": (new Date).getTime(),
                "userId": userId,
                "comment": comment,
                "dataCreated": (new Date).getTime()
            };
            allComments.push(newComment);
            callback(allComments);
        }

        function findAllCommentsForUser(userId, callback) {
            var emptyArray = [];
            for (var i=0; i < allComments.length; i++) {
                if (allComments[i].userId == userId) {
                    emptyArray.push(allComments[i]);
                }
            }
            callback(emptyArray);
        }

        function deleteCommentById(commentId, callback) {
            var index = allComments.indexOf(commentId);
            allComments.splice(index, 1);
            console.log(allComments);
            callback(allComments);
        }

        function updateCommentById(commentId, updatedComment, callback) {
            for (var i = 0; i < allComments.length; i++) {
                var original_comment = allComments[i];
                if (original_comment._id == commentId) {
                    allComments[i].comment = updatedComment.comment;
                    allComments[i].userId = updatedComment.userId;
                }
            }
            console.log(allComments);
            callback(updatedComment);
        }

        return {
            createCommentForUser: createCommentForUser,
            findAllCommentsForUser: findAllCommentsForUser,
            deleteCommentById: deleteCommentById,
            updateCommentById: updateCommentById
        };
    }
}());