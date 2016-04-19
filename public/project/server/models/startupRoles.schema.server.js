/**
 * Created by naineel on 4/18/16.
 */
module.exports = function (mongoose) {
    var RolesSchema = mongoose.Schema({
        tagged: {
            image: String,
            name: String
        },
        role: String,
        title: String,
        startupId: String
    }, {
        collection: 'role'
    });
    return RolesSchema;
};