/**
 * Created by naineel on 3/12/16.
 */
'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('FollowController', FollowController);

    function FollowController($rootScope, $scope, FollowService) {

        $scope.userFollowing = [];
        allFollows();

        function allFollows() {
            FollowService.findAllFollowingForUser($rootScope.user.username, function(follows){
                $scope.userFollowing = follows;
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

        function readFollowing(index) {
            $scope.selectedFollowsIndex = index;
            $scope.selectedFollows = {
                _id: $scope.userFollowing[index]._id,
                user1: $scope.userFollowing[index].user1,
                user2: $scope.userFollowing[index].user2
            }
        }

        function updateFollowing(follows) {
            FollowService.updateAFollowById(follows._id, follows, allFollows);
        }

        function deleteFollowing(follows) {
            FollowService.deleteAFollowById(follows._id, allFollows);
        }


    }
}());