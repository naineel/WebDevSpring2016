/**
 * Created by naineel on 3/11/16.
 */
(function(){
    var startupById = "https://api.angel.co/1/startups/STARTUPID?access_token=5ea0e05d9bdb98611f02fdcf40448f6d3f346b2a6321a378&callback=JSON_CALLBACK";
    angular
        .module("FormBuilderApp")
        .controller("StartupDetailsController", startupDetailsController);

    function startupDetailsController($scope, $location, $http, $routeParams) {
        var startupId = $routeParams.startupId;

        $scope.renderDetails = renderDetails;

        console.log(startupId);

        renderDetails();

        function renderDetails() {
            var url = startupById
                .replace("STARTUPID", startupId);
            $http.jsonp(url)
                .then(function(json) {
                    console.log(json.data);
                    $scope.startup = json.data;
                });
        }

    }
})();