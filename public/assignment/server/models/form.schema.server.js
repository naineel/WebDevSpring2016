/**
 * Created by naineel on 3/28/16.
 */
module.exports = function(mongoose) {
    var FormSchema = mongoose.Schema({
        userIf: String,
        title: String,
        fields: String,
        created: String,
        updated: [String]
    }, {
        collection: 'form'
    });
    return FormSchema;
};