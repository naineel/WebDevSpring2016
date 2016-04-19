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