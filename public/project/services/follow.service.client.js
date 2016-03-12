/**
 * Created by naineel on 3/12/16.
 */
'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('FollowService', FollowService);

    function FollowService() {
        var followData = [
            {"_id": "1", "user1": "alice", "user2": "bob"},
            {"_id": "2", "user1": "alice", "user2": "charlie"},
            {"_id": "3", "user1": "bob", "user2": "charlie"}];

        var service = {
            createAFollowForUser: createAFollowForUser,
            findAllFollowingForUser: findAllFollowingForUser,
            deleteAFollowById: deleteAFollowById,
            updateAFollowById: updateAFollowById
        };

        return service;

        function createAFollowForUser(follows, callback) {
            var newFollow = {
                "_id": (new Date).getTime(),
                "user1": follows.user1,
                "user2": follows.user2
            };
            followData.push(newFollow);
            callback(follows);
        }

        function findAllFollowingForUser(user1, callback) {
            var emptyArray = [];
            for (var i=0; i < forms.length; i++) {
                if (followData[i].user1 == user1) {
                    emptyArray.push(followData[i]);
                }
            }
            callback(emptyArray);
        }

        function deleteAFollowById(followId, callback) {
            var index = followData.indexOf(followId);
            followData.splice(index, 1);
            console.log(followData);
            callback(followData);
        }

        function updateAFollowById(followId, updatedFollow, callback) {
            for (var i = 0; i < followData.length; i++) {
                var original_follow = followData[i];
                if (original_follow._id == followId) {
                    followData[i].user1 = updatedFollow.user1;
                    followData[i].user2 = updatedFollow.user2;
                }
            }
            console.log(followData);
            callback(followData);
        }

    }
}());