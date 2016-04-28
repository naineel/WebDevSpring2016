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
        vm.selectProject = selectProject;
        vm.updateProject = updateProject;
        vm.selectExperience = selectExperience;
        vm.updateExperience = updateExperience;
        vm.selectEducation = selectEducation;
        vm.updateEducation = updateEducation;


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
            vm.userDetails.newProject = null;
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
                vm.userDetails.newExperience = null;
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
                vm.userDetails.newEducation = null;
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

        function selectProject(user, project) {
            console.log("Entered select project");
            console.log(project);
            var newProject = {
                _id : project._id,
                name : project.name,
                description : project.description,
                project_url : project.project_url,
                startDate : project.startDate,
                endDate : project.endDate,
                technologies : project.technologies
            };
            vm.userDetails = user.userDetails;
            vm.userDetails.newProject = newProject;
            vm.userDetails.newProject.startDate = new Date(newProject.startDate);
            vm.userDetails.newProject.endDate = new Date(newProject.endDate);
        }

        function updateProject(user, project) {
            console.log('Update project');
            vm.userDetails = user.userDetails;
            UserService
                .updateProject(user._id, project._id, project)
                .then(init);
            vm.userDetails.newProject = null;
        }

        function selectExperience(user, experience) {
            console.log("Entered select experience");
            console.log(experience);
            console.log(user);
            var newExperience = {
                _id : experience._id,
                employer : experience.employer,
                title : experience.title,
                description : experience.description,
                startDate : experience.startDate,
                endDate : experience.endDate
            };
            vm.userDetails = user.userDetails;
            vm.userDetails.newExperience = newExperience;
            vm.userDetails.newExperience.startDate = new Date(newExperience.startDate);
            vm.userDetails.newExperience.endDate = new Date(newExperience.endDate);
        }

        function updateExperience(user, experience) {
            console.log('Update experience');
            vm.userDetails = user.userDetails;
            UserService
                .updateExperience(user._id, experience._id, experience)
                .then(init);
            vm.userDetails.newExperience = null;
        }

        function selectEducation(user, education) {
            console.log("Entered select experience");
            console.log(education);
            var newEducation = {
                _id : education._id,
                university : education.university,
                major : education.major,
                degree : education.degree,
                achievements : education.achievements,
                yearGraduated : education.yearGraduated
            };
            vm.userDetails = user.userDetails;
            vm.userDetails.newEducation = newEducation;
            vm.userDetails.newEducation.yearGraduated = new Date(newEducation.yearGraduated);
        }

        function updateEducation(user, education) {
            console.log('Update education');
            vm.userDetails = user.userDetails;
            UserService
                .updateEducation(user._id, education._id, education)
                .then(init);
            vm.userDetails.newEducation = null;
        }

    }

})();