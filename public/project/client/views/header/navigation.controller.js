(function(){
    angular
        .module("OmdbApp")
        .controller('NavigationController', navigationController);

    function navigationController($location, UserService, $rootScope) {
        var vm = this;
        vm.logout = logout;

        function init(){
            vm.$location = $location;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/login");
                });
        }
    }
})();