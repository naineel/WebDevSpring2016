(function() {
    angular
        .module("startupApp", [])
        .controller('NavigationCntr', NavigationCntr);

    function NavigationCntr($location) {
        console.log('Here');
    }

})();