(function(){
    angular
        .module('OmdbApp')
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;

        vm.registerUser = registerUser;

        function init() {

        }

        init();

        function registerUser(user) {
            UserService
                .registerUser(user)
                .then(function(response){
                   var currentUser = response.data;
                   if (currentUser != null) {
                       UserService.setCurrentUser(currentUser);
                       $location.url("/profile");
                   }
                });
        }
    }
})();