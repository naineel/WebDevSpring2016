(function(){

    angular
        .module("OmdbApp")
        .controller("StartupDetailsController", StartupDetailsController);

    function StartupDetailsController($routeParams,
                                      AngelListService,
                                      $location, $rootScope,
                                      StartupService) {
        var vm = this;
        var startupId = $routeParams.startupId;

        var currentUser = $rootScope.currentUser;

        vm.renderDetails = renderDetails;
        vm.follow = follow;

        console.log(startupId);

        renderDetails();

        function renderDetails() {
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
        }

        function follow(startup) {
            console.log("Follow this startupId: " + startup);
            console.log(startup);
            if(currentUser) {
                StartupService
                    .setUserFollowsStartup(currentUser._id, startup);
                console.log([currentUser.username, startup]);
            } else {
                $location.url("/login");
            }
        }

    }
})();