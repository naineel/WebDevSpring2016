(function(){
    var DETAILS_URL = "https://api.angel.co/1/startups/STARTUPID?access_token=5ea0e05d9bdb98611f02fdcf40448f6d3f346b2a6321a378&callback=JSON_CALLBACK";
    var KEYWORD_URL = "https://api.angel.co/1/search?access_token=5ea0e05d9bdb98611f02fdcf40448f6d3f346b2a6321a378" +
        "&query=KEYWORD" +
        "&callback=JSON_CALLBACK";

    angular
        .module("FormBuilderApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http) {
        $scope.movieTitle = "Star Wars";

        $scope.searchMovie = searchMovie;
        //$scope.selectMovie = selectMovie;
        $scope.renderDetails = renderDetails;

        function selectMovie(newsItem) {
            var url = DETAILS_URL.replace("STARTUPID", movie.imdbID);
            $http.get(url)
                .success(renderDetails);
        }

        function renderDetails(response) {
            console.log(response);
            $scope.details = response;
        }

        function parse(response) {
            console.log(response);
            $scope.data = response;
        }

        function searchMovie(startupName) {
            var url = KEYWORD_URL
                .replace("KEYWORD", startupName);
            $http.jsonp(url)
                .then(function(json) {
                    console.log(json.data);
                    $scope.data = json.data;
                });
        }


    }
})();