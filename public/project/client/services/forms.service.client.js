/**
 * Created by naineel on 2/25/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                "_id": (new Date).getTime(),
                "title": form.title,
                "userId": userId
            };
            forms.push(newForm);
            console.log(forms);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var emptyArray = [];
            for (var i=0; i < forms.length; i++) {
                if (forms[i].userId == userId) {
                    emptyArray.push(forms[i]);
                }
            }
            callback(emptyArray);
        }

        function deleteFormById(form, callback) {
            var index = forms.indexOf(form);
            forms.splice(index, 1);
            console.log(forms);
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i = 0; i < forms.length; i++) {
                var original_form = forms[i];
                if (original_form._id == formId) {
                    forms[i].title = newForm.title;
                    forms[i].userId = newForm.userId;
                }
            }
            console.log(forms);
            callback(newForm);
        }

    }
})();
