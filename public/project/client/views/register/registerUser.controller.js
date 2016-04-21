(function(){
    angular
        .module('OmdbApp')
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;

        vm.registerUser = registerUser;

        function init() {

        }

        init();

        function registerUser(user) {
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }

            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }

            if (!user.username ||
                    !user.userDetails.firstName ||
                    !user.userDetails.lastName ||
                    !user.userDetails.email) {
                vm.message = "All fields are required!";
                return;
            }

            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }

            if (user.password != user.password2) {
                vm.message = "Passwords must match";
                return;
            }
            user.type = 'user';
            UserService
                .registerUser(user)
                .then(function (response){
                   var currentUser = response.data;
                   if (currentUser != null) {
                       UserService.setCurrentUser(currentUser);
                       $location.url("/userProfile");
                   }
                });
        }
    }
})();