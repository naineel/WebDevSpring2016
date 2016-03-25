(function(){
    angular
        .module("OmdbApp")
        .controller('LoginController', loginController);

    function loginController(UserService, $location) {
        var vm = this;

        vm.loginFunc = loginFunc;

        function init() {

        }

        init();

        function loginFunc(user) {
            if (!user) {
                return;
            }
            console.log("In client/loginController: username=" + user.username);
            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    console.log(response.data);
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }


    }

})();