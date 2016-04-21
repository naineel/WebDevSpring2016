/**
 * Created by naineel on 3/25/16.
 */
(function(){
    angular
        .module('OmdbApp')
        .controller("RegisterStartupController", registerStartupController);

    function registerStartupController(UserService, $location, $rootScope) {
        var vm = this;

        vm.registerStartup = registerStartup;

        function init() {
        }

        init();

        function registerStartup(startup) {
            vm.message = null;
            if (startup == null) {
                vm.message = "Please fill username, website and the high concept fields.";
                return;
            }

            if (!startup.username) {
                vm.message = "Please provide a username";
                return;
            }

            if (!startup.username ||
                    !startup.startupDetails.company_url ||
                    !startup.startupDetails.high_concept) {
                vm.message = "Please fill username, website and the high concept fields.";
                return;
            }

            if (!startup.password || !startup.verifyPassword) {
                vm.message = "Please provide a password";
                return;
            }

            if (startup.password != startup.verifyPassword) {
                vm.message = "Passwords must match";
                return;
            }
            startup.type = 'startup';
            //startup.set('type', 'startup');
            //startup.set('name', startup.username);
            startup.startupDetails.name = startup.username;
            UserService
                .registerUser(startup)
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $rootScope.registeredUser = true;
                        $location.url("/details/" + currentUser._id);
                    }
                });
        }
    }
})();