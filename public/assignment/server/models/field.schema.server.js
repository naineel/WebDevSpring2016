/**
 * Created by naineel on 3/28/16.
 */
module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            default: 'TEXT',
            enum: ['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']
        },
        placeholder: String,
        options: String
    }, {
        collection: 'field'
    });
    return FieldSchema;
};
