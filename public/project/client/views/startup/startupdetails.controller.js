/**
 * Created by naineel on 3/11/16.
 */
(function(){

    angular
        .module("FormBuilderApp")
        .controller("StartupDetailsController", startupDetailsController);

    function startupDetailsController($scope, $routeParams, StartupService) {
        var startupId = $routeParams.startupId;

        $scope.renderDetails = renderDetails;

        console.log(startupId);

        renderDetails();

        function renderDetails() {
            StartupService.renderDetails(startupId)
                .then(function(json) {
                    console.log(json.data);
                    $scope.startup = json.data;
                });
        }

    }
})();