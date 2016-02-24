/**
 * Created by naineel on 2/22/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($scope) {
        $scope.users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        console.log(users);
        //
        //var service = {
        //    findAllUsers : findAllUsers,
        //    findUserByCredentials : findUsersByCredentials(),
        //    createUser : createUser(),
        //    deleteUserById : deleteUserById()
        //
        //};
        //
        //return service;
        //
        //function findUsersByCredentials(username, password, callback)
        //{
        //
        //}
        //
        //function findAllUsers(callback)
        //{
        //    return $scope.users;
        //
        //}
        //
        //function createUser(user, callback)
        //{
        //    var newUser = {
        //        username: user.name,
        //        password: user.password,
        //        email: user.email
        //    }
        //
        //}
        //
        //function deleteUserById(userid, callback)
        //{
        //
        //}
        //
        //function updateUser(userId, user, callback)
        //{
        //
        //}
    }
})();
