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
            if (project != null) {
            UserService
                .addProjectToUser(user._id, project)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.profile = response.data;
                        vm.projectMessage = "Project added successfully";
                    } else {
                        vm.projectMessage = "Unable to add the project";
                    }
                });
            vm.userDetails.project = null;
            } else {
                vm.projectMessage = "Add info. to add as a project.";
            }
        }

        function removeProject(user, project) {
            UserService
                .removeProjectFromUser(user._id, project._id)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.profile = response.data;
                        //vm.user.proj
                        vm.projectMessage = "Project removed successfully";
                    } else {
                        vm.projectMessage = "Unable to remove the project";
                    }
                });
        }

        function addExperience(user, experience) {
            if (experience != null) {
                UserService
                    .addExperienceToUser(user._id, experience)
                    .then(function updatedProfileCallback(response) {
                        if (response.status == 200) {
                            UserService.setCurrentUser(user);
                            vm.profile = response.data;
                            console.log("updated project");
                            console.log(vm.profile);
                            vm.expMessage = "Education added successfully";
                        } else {
                            vm.expMessage = "Unable to add the project";
                        }
                    });
                vm.userDetails.experience = null;
            } else {
                vm.expMessage = "Add info to add as an experience";
            }
        }

        function removeExperience(user, experience) {
            UserService
                .removeExperienceFromUser(user._id, experience._id)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.profile = response.data;
                        vm.expMessage = "Experience removed successfully";
                    } else {
                        vm.expMessage = "Unable to remove the Experience";
                    }
                });
        }

        function addEducation(user, education) {
            if (education != null) {
                UserService
                    .addEducationToUser(user._id, education)
                    .then(function updatedProfileCallback(response) {
                        if (response.status == 200) {
                            UserService.setCurrentUser(user);
                            vm.profile = response.data;
                            vm.eduMessage = "Education added successfully";
                        } else {
                            vm.eduMessage = "Unable to add the Education";
                        }
                    });
                vm.userDetails.education = null;
            } else {
                vm.eduMessage = "Add info to add as an education.";
            }
        }

        function removeEducation(user, education) {
            UserService
                .removeEducationFromUser(user._id, education._id)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUser(user);
                        vm.profile = response.data;
                        vm.eduMessage = "Education removed successfully";
                    } else {
                        vm.eduMessage = "Unable to remove the Education";
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