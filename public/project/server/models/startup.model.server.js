/**
 * Created by naineel on 3/25/16.
 */
var q = require('q');



module.exports = function(app, mongoose) {
    var StartupSchema = require("./startup.schema.server.js")(mongoose);

    var StartupModel = mongoose.model('startup', StartupSchema);

    var api = {
        findStartupByStartupId : findStartupByStartupId,
        createStartup : createStartup,
        findStartupsByStartupIds : findStartupsByStartupIds,
        findStartupsByName : findStartupsByName,
        findStartupByCredentials : findStartupByCredentials,
        getMongooseModel : getMongooseModel
    };

    return api;

    function getMongooseModel() {
        return StartupModel;
    }

    function findStartupByStartupId(startupId) {
        return StartupModel.findById(startupId);
    }

    function createStartup(startup) {
        console.log("Model");
        console.log(startup);
        return StartupModel.create(startup);
    }

    function findStartupsByStartupIds(startupIds) {
        console.log(startupIds);
        var finalStartups = [];
        for (var id in startupIds) {
            console.log("Id in the for loop: " + id);
            console.log("Cached startupList at this time is ");
            console.log(startups);
            var startup = findStartupByStartupId(startupIds[id]);
            if (startup) {
                finalStartups.push(startup);
            }
        }

        return finalStartups;
    }

    function findStartupsByName(startupName) {
        return StartupModel.findOne({name: startupName});
    }

    function findStartupByCredentials(credentials) {
        //var deferred = q.defer();
        //console.log("crednetial name: " + credentials.name);
        //console.log("crednetial password: " + credentials.password);
        // StartupModel.find(
        //    {name: String(credentials.name),
        //        password: String(credentials.password)}
        //    ).then(function(err, startup) {
        //        if (!err) {
        //            deferred.resolve(startup);
        //        } else {
        //            deferred.reject(err);
        //        }
        //
        //    });
        //return deferred.promise;
        return StartupModel.findOne({name: String(credentials.name),
                    password: String(credentials.password)});
    }
};