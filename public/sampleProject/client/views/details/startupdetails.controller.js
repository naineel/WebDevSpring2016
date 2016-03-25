(function(){

    angular
        .module("OmdbApp")
        .controller("StartupDetailsController", startupDetailsController);

    function startupDetailsController($scope, $routeParams,
                                      AngelListService, $rootScope,
                                      $location) {
        var startupId = $routeParams.startupId;

        var currentUser = $rootScope.currentUser;

        $scope.renderDetails = renderDetails;
        $scope.follow = follow;

        console.log(startupId);

        renderDetails();

        function renderDetails() {
            AngelListService.renderDetailsReal(startupId)
                .then(function (json) {
                    console.log(json.data);
                    $scope.startup = json.data;
                });

            AngelListService.findStartupRoles(startupId)
                .then(function (json) {
                    //console.log("Roles: " + json.data.startup_roles);
                    $scope.startupRoles = json.data.startup_roles;
                });
        }

        function follow(startup) {
            console.log("Follow this startupId: " + startup);
            if(currentUser) {
                console.log([currentUser.username, startup]);
            } else {
                $location.url("/login");
            }
        }

    }
})();