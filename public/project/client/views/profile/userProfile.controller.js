/**
 * Created by naineel on 4/12/16.
 */
(function(){
    angular
        .module("OmdbApp")
        .controller('userProfileController', userProfileController);

    function userProfileController(UserService, $routeParams, $rootScope, FollowService, AngelListService) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.profile = vm.currentUser;
        console.log('userProfileController');

        vm.getFollows = getFollows;
        vm.unfollow = unfollow;

        getFollows();

        function getFollows() {
            FollowService.getFollowsForUsername(vm.currentUser.username)
                .then(
                    function (response) {
                        console.log('This is the response from get follows');
                        console.log(response);
                        var startupList = [];
                        var followsData = response.data;
                        for (var i=0; i < followsData.length; i++) {
                            (function(){
                                var startupId = followsData[i].startupId;
                                UserService.getProfile(startupId)
                                    .then(function (json) {
                                            console.log('JSON return from getProfile');
                                            console.log(json);
                                            var startupInfo = json.data;
                                            var newStartup = {
                                                startupId : startupInfo._id,
                                                name : startupInfo.startupDetails.name,
                                                logo_url : startupInfo.startupDetails.logo_url
                                            };
                                            startupList.push(newStartup);
                                        },
                                        function (error) {
                                            AngelListService.renderDetailsReal(startupId)
                                                .then( function (response) {
                                                        var startupInfo = response.data;
                                                        console.log(startupInfo);
                                                        var newStartup = {
                                                            startupId : startupInfo.id,
                                                            name : startupInfo.name,
                                                            logo_url : startupInfo.logo_url
                                                        };
                                                        startupList.push(newStartup);
                                                    },
                                                    function (err) {
                                                        console.log(err);
                                                    });
                                        });
                            })();
                        }
                        console.log('This is the final follows list');
                        console.log(startupList);

                        vm.startupList = startupList;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function unfollow(startup) {
            FollowService.removeFollowByUsernameAndStartupId(vm.currentUser.username, startup.startupId)
                .then(function (response) {
                    console.log('response after removing follow');
                    console.log(response);
                    getFollows();
                },
                function (err) {
                    console.log(err);
                });
        }

    }

})();