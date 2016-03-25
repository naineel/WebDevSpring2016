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
            if (startups[i].startupId === startupId) {
                return startups[i];
            }
        }
        return null;
    }

    function createStartup(startup) {
        var cacheStartup = {
            _id: (new Date()).getTime(),
            name: startup.name,
            description: startup.product_desc,
            company_url: startup.company_url,
            logo_url: startup.logo_url,
            startupId : startup.startupId
        };
        startups.push(cacheStartup);
        return cacheStartup;
    }

    function findStartupsByStartupIds(startupIds) {
        var startups = [];
        for (var id in startupIds) {
            var startup = findStartupByStartupId(startupIds[id]);
            if (startup) {
                startups.push(startup);
            }
        }

        return startups;
    }
};