(function(){
    angular
        .module("OmdbApp")
        .filter('pagination', function() {
            return function (input, start) {
                if (input) {
                    start = +start;
                    return input.slice(start);
                }
            };
        })
        .controller("SearchControllerReal", SearchControllerReal);

    function SearchControllerReal(AngelListService) {
        var vm = this;
        vm.searchStartupReal = searchStartupReal;

        vm.numberOfPages = numberOfPages;
        vm.curPage = 0;
        vm.pageSize = 8;

        function init() {

        }

        init();

        function searchStartupReal(startupName) {
            console.log("Startup search in client/view/search: startupName = " + startupName);
            AngelListService
                .searchStartupReal(startupName)
                .then(function (json) {
                    console.log(json.data);
                    vm.data = json.data;
                });
        }

        function numberOfPages() {
            if (!vm.data) { return; }
            return Math.ceil(vm.data.length / vm.pageSize);
        }

    }
})();