/**
 * Created by naineel on 3/31/16.
 */
var q = require("q");

module.exports = function (db, mongoose, FormModel) {
    var FieldSchema = require("./form.schema.server.js")(mongoose);
    //var Field = mongoose.model("field", FieldSchema);

    var Form = FormModel.getMongooseModel();

    var api = {
        findFieldByFieldIdAndFormId : findFieldByFieldIdAndFormId,
        updateFieldInForm : updateFieldInForm,
        createFieldInForm : createFieldInForm,
        deleteFieldByFieldIdAndFormId : deleteFieldByFieldIdAndFormId,
        updateAllFields : updateAllFields,
        findAllFieldsForFormByFormId : findAllFieldsForFormByFormId
    };

    return api;

    function findFieldByFieldIdAndFormId(formId, fieldId) {
        //var form = FormModel.findFormById(formId);
        //var formFields = form.fields;
        //for (var i=0; i < formFields; i++) {
        //    if (formFields[i] == fieldId) {
        //        return formFields[i];
        //    }
        //}
        //return null;
        return Form
            .findById(formId)
            .then(
                function (form) {
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function updateFieldInForm(formId, fieldId, fieldObj) {
        //var form = FormModel.findFormById(formId);
        //var fields = form.fields;
        //for(var i = 0; i < fields.length; i++) {
        //    if (fields[i]._id == fieldId) {
        //        fields[i]._id = fieldId;
        //        fieldId._id = fieldId;
        //        fields[index].label = field.label;
        //        fields[index].type = field.type;
        //        fields[index].placeholder = field.placeholder;
        //        break;
        //    }
        //}
        //form.fields = fields;
        //FormModel.updateFormById(formId, form);
        //return form;
        return Form
            .findById(formId)
            .then(
                function (form) {
                    var field = form.fields.id(fieldId);
                    field.label = fieldObj.label;
                    field.type = fieldObj.type;
                    field.placeholder = fieldObj.placeholder;
                    return form.save();
                }
            );
    }

    function createFieldInForm(formId, field) {
        //var form = FormModel.findFormById(formId);
        //var newField = {
        //    _id: (new Date).getTime(),
        //    label: field.label,
        //    type: field.type,
        //    placeholder: field.placeholder
        //};
        //form.fields.push(newField);
        //FormModel.updateFormById(formId, form);
        //return form;
        return Form
            .findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        console.log(formId + " " + fieldId);
        //var form = FormModel.findFormById(formId);
        //var fields = form.fields;
        //for(var i=0; i < fields.length; i++) {
        //    if(fields[i]._id == fieldId) {
        //        fields.splice(i, 1);
        //        break;
        //    }
        //}
        //form.fields = fields;
        //FormModel.updateFormById(formId, form);
        //return form;
        return Form
            .findById(formId)
            .then(
              function (form){
                  form.fields.id(fieldId).remove();
                  return form.save();
              }
            );
    }

    function updateAllFields(formId, fields) {
        //var form = FormModel.findById(formId);
        //form.fields = fields;
        //FormModel.updateFormById(formId, form);
        //return form;
        return Form
            .findById(formId)
            .then(
                function (form) {
                   form.fields = fields;
                   return form.save();
                }
            );
    }

    function findAllFieldsForFormByFormId(formId) {
        //var form = FormModel.findFormById(formId);
        //return form.fields;
        return Form.findById(formId).select("fields");
    }
};