/**
 * Created by naineel on 3/12/16.
 */
'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('CommentController', CommentController);

    function CommentController($rootScope, $scope, CommentService) {

        $scope.userComments = [];
        allComments();

        function allComments() {
            CommentService.findAllCommentsForUser($rootScope.newUser._id, function(comments){
                $scope.userComments = comments;
                delete $scope.selectedComment;
            });
        }

        $scope.addComment = addComment;
        $scope.updateComment = updateComment;
        $scope.deleteComment = deleteComment;
        $scope.selectComment = selectComment;

        function addComment(comment) {
            console.log(comment);
            if (comment.comment) {
                CommentService.createCommentForUser($rootScope.newUser._id, comment, allComments);
            }
        }

        function updateComment(comment) {
            CommentService.updateCommentById(comment._id, comment, allComments);
        }

        function deleteComment(comment) {
            CommentService.deleteCommentById(comment._id, allComments);
        }

        function selectComment(comment) {
            $scope.selectedComment = {
                _id: comment._id,
                comment: comment.comment,
                dateCreated: comment.dateCreated
            };
        }
    }
}());