(function(){
    angular
        .module("FormBuilderApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, StartupService) {
        $scope.searchStartup = searchStartup;

        function searchStartup(startupName) {
            StartupService.searchStartup(startupName)
                .then(function(json) {
                    console.log(json.data);
                    $scope.data = json.data;
                });
        }

    }
})();