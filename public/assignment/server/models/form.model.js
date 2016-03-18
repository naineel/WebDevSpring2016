/**
 * Created by naineel on 3/17/16.
 */
var forms = require("./form.mock.json");

module.exports = function() {
    var api = {
        createFormForUser : createFormForUser,
        findAllFormsForUser : findAllFormsForUser,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,
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
                //forms[i]._id = newForm._id;
                forms[i].title = newForm.title;
                forms[i].userId = newForm.userId;
                break;
            }
        }
        console.log(forms);
        return newForm;
    }

    function findFormByTitle(title) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title === title) {
                return forms[i];
            }
        }

        return null;
    }
};