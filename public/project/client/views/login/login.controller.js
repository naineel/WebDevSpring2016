(function(){
    angular
        .module("OmdbApp")
        .controller('LoginController', loginController);

    function loginController(UserService, $location, $rootScope) {
        var vm = this;

        vm.loginFunc = loginFunc;

        function init() {
        }

        init();

        function loginFunc(user) {
            UserService
                .login(user)
                .then(
                    function (response) {
                        $rootScope.currentUser = response.data;
                        var user = $rootScope.currentUser;
                        if (user.type === 'user') {
                            $location.path('/userProfile');
                        } else {
                            $rootScope.registeredUser = true;
                            $location.path('/details/' + user._id);
                        }
                    },
                    function (err) {
                        vm.error = err;
                        vm.message = "The credentials do not exist or they do not match..Please try again";
                    }
                );
        }


    }

})();