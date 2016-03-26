/**
 * Created by naineel on 3/25/16.
 */
(function(){
    angular
        .module('OmdbApp')
        .controller("RegisterStartupController", registerStartupController);

    function registerStartupController(UserService, $location, StartupService) {
        var vm = this;

        vm.registerStartup = registerStartup;

        function init() {

        }

        init();

        function registerStartup(startup) {
            StartupService
                .registerStartup(startup)
                .then(function(response) {
                    var currentStartup = response.data;
                    if (currentStartup != null) {
                        UserService.setCurrentUser(currentStartup);
                        $location.url("/profile");
                    }
                });
        }
    }
})();