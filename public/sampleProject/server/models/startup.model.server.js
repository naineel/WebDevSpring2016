/**
 * Created by naineel on 3/25/16.
 */
module.exports = function() {
    var startups = [];
    var api = {
        findStartupByStartupId : findStartupByStartupId,
        createStartup : createStartup,
        findStartupsByStartupIds : findStartupsByStartupIds
    };

    return api;

    function findStartupByStartupId(startupId) {
        for (var i = 0; i < startups.length; i++) {
            //Stupid bug cant compare string with number
            if (startups[i].startupId === Number(startupId)) {
                return startups[i];
            }
        }
        return null;
    }

    function createStartup(startup) {
        var cacheStartup = {
            id: (new Date()).getTime(),
            name: startup.name,
            description: startup.product_desc,
            company_url: startup.company_url,
            logo_url: startup.logo_url,
            startupId : startup.id
        };
        startups.push(cacheStartup);
        console.log("List of startups follows: ");
        console.log(startups);
        return cacheStartup;
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
};