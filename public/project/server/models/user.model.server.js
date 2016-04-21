//var users = require("./user.mock.json");

var textSearch = require('mongoose-text-search');
var q = require("q");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.server")(mongoose);

    //UserSchema.plugin(textSearch);
    //UserSchema.index({username: 'text'});

    var UserModel = mongoose.model('userp', UserSchema);

    var api = {
        findUserByCredentialsReal : findUserByCredentialsReal,
        createUserP : createUserP,
        findUserByIdP : findUserByIdP,
        updateUser : updateUser,
        findUserByUsernameP : findUserByUsernameP,
        findAllUsers : findAllUsers,
        createProjectInProfile : createProjectInProfile,
        removeProjectFromProfile : removeProjectFromProfile,
        createExperienceInProfile : createExperienceInProfile,
        removeExperienceFromProfile : removeExperienceFromProfile,
        createEducationInProfile : createEducationInProfile,
        removeEducationFromProfile : removeEducationFromProfile,
        getMongooseModel : getMongooseModel,
        searchText : searchText,
        updateProfilePic : updateProfilePic,
        updateLogo : updateLogo
    };

    return api;

    function getMongooseModel() {
        return UserModel;
    }

    function findUserByCredentialsReal(credentials) {
        console.log("In server/model/userModel: credentials123= " + credentials.username + " " + credentials.password);
        return UserModel.findOne(
            {username: credentials.username,
                password: credentials.password}
        );
    }

    function createUserP(userDetails) {
        return UserModel.create(userDetails);
    }

    function findUserByIdP(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(userId, user) {
        console.log("update user: " + userId);
        delete user._id;
        return UserModel.update({_id: userId}, {$set: user});
    }

    function findUserByUsernameP(username) {
        return UserModel.findOne(
            {username: username});
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function createProjectInProfile(userId, project) {
        return UserModel
            .findById(userId)
            .then(function (user) {
                user.userDetails.projects.push(project);
                return user.save();
                //form.fields.id(fieldId).remove();
                //return form.save();
            });
    }

    function removeProjectFromProfile(userId, projectId) {
        return UserModel
            .findById(userId)
            .then(
                function (user) {
                    user.userDetails.projects.id(projectId).remove();
                    return user.save();
                }
            );
    }

    function createExperienceInProfile(userId, exp) {
        return UserModel
            .findById(userId)
            .then(function (user) {
                user.userDetails.experience.push(exp);
                return user.save();
                //form.fields.id(fieldId).remove();
                //return form.save();
            });
    }

    function removeExperienceFromProfile(userId, expId) {
        return UserModel
            .findById(userId)
            .then(
                function (user) {
                    user.userDetails.experience.id(expId).remove();
                    return user.save();
                }
            );
    }

    function createEducationInProfile(userId, edu) {
        return UserModel
            .findById(userId)
            .then(function (user) {
                user.userDetails.education.push(edu);
                return user.save();
                //form.fields.id(fieldId).remove();
                //return form.save();
            });
    }

    function removeEducationFromProfile(userId, eduId) {
        return UserModel
            .findById(userId)
            .then(
                function (user) {
                    user.userDetails.education.id(eduId).remove();
                    return user.save();
                }
            );
    }

    function searchText(searchString) {
        console.log('xxxxxxxxxx');
        console.log(searchString);
        var deferred = q.defer();
        UserModel
            .textSearch(searchString, function (err, output) {
                if (!err) {
                    console.log(output);
                    deferred.resolve (output);
                } else {
                    deferred.reject (err);
                }
            });
        return deferred.promise;
    }

    function updateProfilePic(id, profilePic) {
        var deferred = q.defer();
        UserModel.update(
            {_id: id},
            {$set: {
                "userDetails.profilePicUrl" : profilePic
            }},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function updateLogo(id, logoPic) {
        var deferred = q.defer();
        UserModel.update(
            {_id: id},
            {$set: {
                "startupDetails.logo_url" : logoPic
            }},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

};