/**
 * Created by naineel on 3/17/16.
 */
module.exports = function(db, mongoose) {
    var forms = require('./form.mock.json');
    var api = {
        createFormForUser : createFormForUser,
        findAllFormsForUser : findAllFormsForUser,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,
        findFormById : findFormById,
        findFieldByFieldIdAndFormId : findFieldByFieldIdAndFormId,
        updateFieldInForm : updateFieldInForm,
        createFieldInForm : createFieldInForm,
        deleteFieldByFieldIdAndFormId : deleteFieldByFieldIdAndFormId,
        findFormByTitle : findFormByTitle
    };

    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            "_id": (new Date).getTime(),
            "title": form.title,
            "userId": userId
        };
        forms.push(newForm);
        console.log(forms);
        return form;
    }

    function findAllFormsForUser(userId) {
        var emptyArray = [];
        for (var i=0; i < forms.length; i++) {
            if (forms[i].userId == userId) {
                emptyArray.push(forms[i]);
            }
        }
        console.log(emptyArray);
        return emptyArray;
    }

    function deleteFormById(form) {
        var index = forms.indexOf(form);
        forms.splice(index, 1);
        console.log(forms);
        return forms;
    }

    function updateFormById(formId, newForm) {
        for (var i = 0; i < forms.length; i++) {
            var original_form = forms[i];
            if (original_form._id == formId) {
                forms[i]._id = formId;
                newForm._id = formId;
                forms[i].title = newForm.title;
                forms[i].userId = newForm.userId;
                break;
            }
        }
        console.log(forms);
        return newForm;
    }

    function findFormById(formId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id === formId) {
                return forms[i];
            }
        }

        return null;
    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {
        var form = findFormById(formId);
        var formFields = form.fields;
        for (var i=0; i < formFields; i++) {
            if (formFields[i] == fieldId) {
                return formFields[i];
            }
        }
        return null;
    }

    function updateFieldInForm(formId, fieldId, field) {
        var form = findFormById(formId);
        var fields = form.fields;
        for(var i = 0; i < fields.length; i++) {
            if (fields[i]._id == fieldId) {
                fields[i]._id = fieldId;
                fieldId._id = fieldId;
                fields[index].label = field.label;
                fields[index].type = field.type;
                fields[index].placeholder = field.placeholder;
                break;
            }
        }
        form.fields = fields;
        updateFormById(formId, form);
        return form;
    }

    function createFieldInForm(formId, field) {
        var form = findFormById(formId);
        var newField = {
          _id: (new Date).getTime(),
          label: field.label,
          type: field.type,
          placeholder: field.placeholder
        };
        form.fields.push(newField);
        updateFormById(formId, form);
        return form;
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        var form = findFormById(formId);
        var fields = form.fields;
        for(var i=0; i < fields.length; i++) {
            if(fields[i]._id == fieldId) {
                fields.splice(i, 1);
                break;
            }
        }
        form.fields = fields;
        updateFormById(formId, form);
        return form;
    }

    function findFormByTitle(title) {
        for (var a = 0 ; a < forms.length; a++) {
            if (forms[a].title == title) {
                return forms[a];
            }
        }

        return null;
    }

};