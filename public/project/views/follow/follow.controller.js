/**
 * Created by naineel on 3/12/16.
 */
'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('FollowController', FollowController);

    function FollowController($rootScope, $scope, FollowService) {

        $scope.userFollows = [];
        allFollows();

        function allFollows() {
            FollowService.findAllFollowingForUser($rootScope.newUser.username, function(follows){
                $scope.userFollows = follows;
                delete $scope.selectedFollows;
                delete $scope.selectedFollowsIndex;
            });
        }

        $scope.createFollowing = createFollowing;
        $scope.readFollowing = readFollowing;
        $scope.updateFollowing = updateFollowing;
        $scope.deleteFollowing = deleteFollowing;


        function createFollowing(follows) {
            if (follows.user1 && follows.user2) {
                FollowService.createAFollowForUser(follows, allFollows);
            }
        }

        function readFollowing(follows) {
            $scope.selectedFollowsIndex = follows._id;
            $scope.selectedFollows = {
                _id: follows._id,
                user1: follows.user1,
                user2: follows.user2
            };
        }

        function updateFollowing(follows) {
            FollowService.updateAFollowById(follows._id, follows, allFollows);
        }

        function deleteFollowing(follows) {
            console.log(follows);
            FollowService.deleteAFollowById(follows._id, allFollows);
        }


    }
}());