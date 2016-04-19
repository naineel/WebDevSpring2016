/**
 * Created by naineel on 4/18/16.
 */
(function(){
    angular
        .module("OmdbApp")
        .controller('UpdateStartupProfileController', UpdateStartupProfileController);

    function UpdateStartupProfileController(UserService, $routeParams, $rootScope, RolesService, JobService) {
        var vm = this;

        vm.update = update;
        vm.addPerson = addPerson;
        vm.removePerson = removePerson;
        vm.addJob = addJob;
        vm.removeJob = removeJob;
        //vm.addEducation = addEducation;
        //vm.removeEducation = removeEducation;


        var username = $routeParams.username;
        console.log("Username in profile controller: " + username);

        function init() {
            console.log("In update profile controller");
            UserService
                .getProfile($rootScope.currentUser._id)
                .then(function (response) {
                    vm.profile = response.data;
                    RolesService.getRolesByStartupId($rootScope.currentUser._id)
                        .then(function (response) {
                            vm.startupRolesAll = response.data;
                            JobService
                                .getJobsByStartupId($rootScope.currentUser._id)
                                .then(function (json) {
                                    vm.jobs = json.data;
                                }, function (err) {
                                    console.log(err);
                                });
                        }, function (err) {
                            console.log(err);
                        });

                    console.log(vm.profile);
                });
        }
        init();

        function update(user) {
            console.log("This is user...trying to update");
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

        function addPerson(startup, person) {
            console.log(startup);
            console.log(person);
            person.startupId = startup._id;
            RolesService
                .addRoleToStartup(person)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        //UserService.setCurrentUser(user);
                        //vm.profile = response.data;
                        console.log(response);
                        RolesService.getRolesByStartupId(startup._id)
                            .then(function (response) {
                                vm.startupRolesAll = response.data;
                            }, function (err) {
                                console.log(err);
                            });
                        vm.message = "Person added successfully";
                    } else {
                        vm.message = "Unable to add the project";
                    }
                });
            vm.startupRoles.person = null;
        }


        function addJob(startup, job) {
            job.startupId = startup._id;
            JobService
                .addJobToStartup(job)
                .then(function updateJobCallback(response) {
                    if (response.status == 200) {
                        JobService.getJobsByStartupId(startup._id)
                            .then(function (response) {
                                vm.jobs = response.data;
                            }, function (err) {
                                console.log(err);
                            });
                        vm.message = "Job added successfully";
                    } else {
                        vm.message ="Unable to add job";
                    }
                });
            vm.job = null;
        }

        function removePerson(startup, person) {
            RolesService
                .removeRoleFromStartup(startup._id, person._id)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        RolesService.getRolesByStartupId(startup._id)
                            .then(function (response) {
                                vm.startupRolesAll = response.data;
                            }, function (err) {
                                console.log(err);
                            });
                        vm.message = "Person removed successfully";
                    } else {
                        vm.message = "Unable to remove the Person";
                    }
                });
        }

        function removeJob(startup, job) {
            JobService
                .removeJobFromStartup(job)
                .then(function updated(response) {
                    if (response.status == 200) {
                        JobService.getJobsByStartupId(startup._id)
                            .then(function (response) {
                                vm.jobs = response.data;
                            }, function (err) {
                               console.log(err);
                            });
                        vm.message = "Job removed successfully";
                    } else {
                        vm.message = "Unable to remove Job"
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

    }

})();