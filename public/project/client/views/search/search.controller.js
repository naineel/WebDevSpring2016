(function(){
    angular
        .module("OmdbApp")
        .controller("SearchControllerReal", SearchControllerReal);

    function SearchControllerReal(AngelListService) {
        var vm = this;
        vm.searchStartupReal = searchStartupReal;

        function init() {

        }

        init();

        function searchStartupReal(startupName) {
            console.log("Startup search in client/view/search: startupName = " + startupName);
            AngelListService
                .searchStartupReal(startupName)
                .then(function(json) {
                    console.log(json.data);
                    vm.data = json.data;
                });
        }

    }
})();