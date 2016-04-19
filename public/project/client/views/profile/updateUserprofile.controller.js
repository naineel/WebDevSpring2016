(function(){
    angular
        .module("OmdbApp")
        .controller('UpdateUserProfileController', updateUserProfileController);

    function updateUserProfileController(UserService, $routeParams, $rootScope) {
        var vm = this;

        vm.update = update;
        vm.addProject = addProject;
        vm.removeProject = removeProject;
        vm.addExperience = addExperience;
        vm.removeExperience = removeExperience;
        vm.addEducation = addEducation;
        vm.removeEducation = removeEducation;
        vm.updateProfilePic = updateProfilePic;


        var username = $routeParams.username;
        console.log("Username in profile controller: " + username);

        function init() {
            console.log("In update profile controller");
            UserService
                .getProfile($rootScope.currentUser._id)
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
        init();

        function update(user) {
            console.log("This is user trying to update");
            console.log(user);
            UserService
                .updateUser(user._id, user)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.user = user;
                        vm.message = "User updated successfully";
                    } else {
                        vm.message = "Unable to update the user";
                    }
                });
        }

        function addProject(user, project) {
            vm.project = null;
            UserService
                .addProjectToUser(user._id, project)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.profile = response.data;
                        vm.message = "Project added successfully";
                    } else {
                        vm.message = "Unable to add the project";
                    }
                });
        }

        function removeProject(user, project) {
            UserService
                .removeProjectFromUser(user._id, project._id)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.profile = response.data;
                        //vm.user.proj
                        vm.message = "Project removed successfully";
                    } else {
                        vm.message = "Unable to remove the project";
                    }
                });
        }

        function addExperience(user, experience) {
            vm.experience = null;
            UserService
                .addExperienceToUser(user._id, experience)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.profile = response.data;
                        console.log("updated project");
                        console.log(vm.profile);
                        vm.message = "Project added successfully";
                    } else {
                        vm.message = "Unable to add the project";
                    }
                });
        }

        function removeExperience(user, experience) {
            UserService
                .removeExperienceFromUser(user._id, experience._id)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.profile = response.data;
                        vm.message = "Experience removed successfully";
                    } else {
                        vm.message = "Unable to remove the Experience";
                    }
                });
        }

        function addEducation(user, education) {
            vm.education = null;
            UserService
                .addEducationToUser(user._id, education)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.profile = response.data;
                        vm.message = "Education added successfully";
                    } else {
                        vm.message = "Unable to add the Education";
                    }
                });
        }

        function removeEducation(user, education) {
            UserService
                .removeEducationFromUser(user._id, education._id)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.profile = response.data;
                        vm.message = "Education removed successfully";
                    } else {
                        vm.message = "Unable to remove the Education";
                    }
                });
        }

        function updateProfilePic() {
            UserService
                .updateProfilePicture($rootScope.currentUser._id, vm.fileModel)
                .then(function successCallback(response) {
                vm.profile.userDetails.profilePicUrl = response.data;
                vm.showProfilePicSuccessAlert = true;
            });
        }

    }

})();