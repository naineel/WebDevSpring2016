(function(){

    angular
        .module("OmdbApp")
        .controller("StartupDetailsController", StartupDetailsController);

    function StartupDetailsController($routeParams,
                                      AngelListService,
                                      $location, $rootScope,
                                      StartupService, UserService, CommentService, FollowService,
                                      RolesService, JobService) {
        var vm = this;
        var startupId = $routeParams.startupId;

        var currentUser = $rootScope.currentUser;

        vm.currentUser = $rootScope.currentUser;
        vm.renderDetails = renderDetails;
        vm.follow = follow;
        vm.addComment = addComment;
        vm.removeComment = removeComment;
        vm.getFollows = getFollows;
        vm.unfollow = unfollow;

        console.log(startupId);

        renderDetails();
        showAllCommentsForStartup();


        function renderDetails() {
            FollowService.getFollowsForStartupId(startupId)
                .then(
                    function (response) {
                        var followList = response.data;
                        for (var i = 0; i < followList.length; i++) {
                            if (followList[i].username == vm.currentUser.username) {
                                vm.followed = true;
                            }
                        }
                        vm.noOfFollowers = followList.length;
                    }, function (err) {
                        console.log(err);
                    }
                );

                UserService.getProfile(startupId)
                    .then(function (json) {
                        console.log('JSON return from getProfile');
                            console.log(json);
                            vm.startup = json.data.startupDetails;
                            vm.startup.userId = json.data._id;
                            RolesService.getRolesByStartupId(startupId)
                                .then(function (response) {
                                    console.log('There are roles here');
                                    vm.startupRoles = response.data;
                                }, function (err) {
                                    console.log(err);
                                });
                        },
                    function (error) {
                        AngelListService.renderDetailsReal(startupId)
                            .then(function (json) {
                                console.log(json.data);
                                vm.startup = json.data;
                            });

                        AngelListService.findStartupRoles(startupId)
                            .then(function (json) {
                                //console.log("Roles: " + json.data.startup_roles);
                                vm.startupRoles = json.data.startup_roles;
                            });
                    });
            JobService
                .getJobsByStartupId(startupId)
                .then(function (json) {
                    console.log(json);
                    console.log('-------------');
                    vm.jobs = json.data;
                    console.log(vm.jobs.skills);
                }, function (err) {
                    console.log(err);
                });
        }

        function showAllCommentsForStartup() {
            CommentService.getCommentsByStartupId(startupId)
                .then(function (json) {
                   vm.comments = json.data;
                    console.log(vm.comments);
                });
        }

        function follow(startup) {
            console.log("Follow this startupId: ");
            vm.followed = true;
            console.log(startup);
            if(currentUser) {
                if (startup.id) {
                    var newFollow = {
                        username : currentUser.username,
                        startupId : startup.id
                    };
                } else {
                    newFollow = {
                        username : currentUser.username,
                        startupId : startup.userId
                    };
                }
                FollowService.addFollow(newFollow);
                getFollows();
            } else {
                vm.followError = "Please log in first to follow the company";
                //$location.url("/login");
            }
        }

        function addComment(comment) {
            if ($rootScope.currentUser) {
                console.log($rootScope.currentUser);
                console.log('xxxxxxx');
                var newComment = {
                    "username" : $rootScope.currentUser.username,
                    "comment" : comment,
                    "timestamp" : Date.now,
                    "startupId" : startupId
                };
                console.log('Trying to add comment');
                console.log(newComment);
                CommentService.addCommentToStartup(newComment)
                    .then(function (response) {
                        console.log('THis is the response');
                        console.log(response);
                        vm.comment = null;
                        vm.currentUser = $rootScope.currentUser;
                        showAllCommentsForStartup();
                    }, function (err) {
                        console.log(err);
                    });
            } else {
                vm.message = "Please log in first to comment.";
                vm.comment = null;
            }
        }

        function removeComment(comment) {
            CommentService
                .removeCommentFromStartup(comment)
                .then(function (response) {
                   showAllCommentsForStartup();
                }, function(err) {
                    console.log(err);
                });
        }

        function getFollows() {
            FollowService.getFollowsForStartupId(startupId)
                .then(
                    function (response) {
                        var followList = response.data;
                        vm.noOfFollowers = followList.length;
                    }, function (err) {
                        console.log(err);
                    }
                );
        }

        function unfollow(startup) {
            console.log('Unfollow request for ');
            console.log(startup);
            var id;
            if (startup.id) {
                id = startup.id;
            } else {
                id = startup.userId;
            }
            FollowService.removeFollowByUsernameAndStartupId(vm.currentUser.username, id)
                .then(function (response) {
                        console.log('response after removing follow');
                        console.log(response);
                        vm.followed = false;
                        getFollows();
                    },
                    function (err) {
                        console.log(err);
                    });
        }

    }
})();