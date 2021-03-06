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
        vm.updateLogo = updateLogo;
        //vm.addEducation = addEducation;
        //vm.removeEducation = removeEducation;
        vm.selectJob = selectJob;
        vm.updateJob = updateJob;
        vm.selectPerson = selectPerson;
        vm.updatePerson = updatePerson;


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
            if ((person != null) && (person.tagged.name && person.role && person.title)) {
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
                            vm.personMessage = "Person added successfully";
                            vm.startupRoles.newPerson = null;
                        } else {
                            vm.personMessage = "Unable to add the project";
                            vm.startupRoles.newPerson = null;
                        }
                    });
            } else {
                vm.personMessage = "Add some information to add the person.";
            }

        }


        function addJob(startup, job) {
            if (job != null) {
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
                            vm.jobMessage = "Job added successfully";
                        } else {
                            vm.jobMessage ="Unable to add job";
                        }
                    });
                vm.newJob = null;
            } else {
                vm.jobMessage = "Add information to add a job."
            }
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

        function updateLogo() {
            UserService
                .updateStartupLogo($rootScope.currentUser._id, vm.fileModel)
                .then(function successCallback(response) {
                    vm.profile.startupDetails.logo_url = response.data;
                    vm.showLogoSuccessAlert = true;
                });
        }

        function selectJob(startup, job) {
            console.log(job);
            var newJob = {
               _id : job._id,
               position : job.position,
               description : job.description,
               startupId : job.startupId,
               skills : job.skills
            };
            vm.newJob = newJob;
        }

        function updateJob(job) {
            JobService.
                updateJobInStartup(job._id, job)
                .then(init);
            vm.newJob = null;
        }

        function selectPerson(startup, person) {
            console.log('select person');
            console.log(startup);
            var newRole = {
              _id : person._id,
              role : person.role,
                title : person.title,
                startupId : person.startupId,
                tagged : {
                    name : person.tagged.name,
                    image : person.tagged.image
                }
            };
            vm.startupRoles = {};
            vm.startupRoles.newPerson = newRole;
        }

        function updatePerson(role) {
            RolesService.
                updateRole(role._id, role)
                .then(init);
            vm.startupRoles.newPerson = null;
        }

    }

})();