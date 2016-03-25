(function(){
    angular
        .module("OmdbApp")
        .controller('ProfileController', profileController);

    function profileController(UserService) {
        var vm = this;

        function init() {
            UserService
                .getProfile()
                .then(function(response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
        return init();
    }

})();