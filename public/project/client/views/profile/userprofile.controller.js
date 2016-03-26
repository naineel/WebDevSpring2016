(function(){
    angular
        .module("OmdbApp")
        .controller('ProfileController', profileController);

    function profileController(UserService, $routeParams) {
        var vm = this;

        vm.update = update;

        var username = $routeParams.username;
        console.log("Username in profile controller: " + username);

        function init() {
            console.log("In init profile controller");
            UserService
                .getProfile()
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
        return init();

        function update(user) {
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
    }

})();