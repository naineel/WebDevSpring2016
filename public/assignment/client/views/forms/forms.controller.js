/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $location, FormService, UserService){
        var vm = this;
        var currentUser = $rootScope.newUser;
        vm.$location = $location;

        function init() {
            FormService
                .findAllFormsForUser(currentUser._id)
                .then(formCallback);
        }

        init();

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.clickedForm = clickedForm;

        function addForm (form) {
            form.userId = currentUser._id;
            FormService
                .createFormForUser(currentUser._id, form)
                .then(addNewForm);
            vm.form = null;
        }

        function updateForm (form) {
            FormService
                .updateFormById(form._id, form)
                .then(addNewForm);
            vm.form = null;
        }

        function deleteForm (form) {
            console.log("Delete form " + form);
            FormService
                .deleteFormById(form._id)
                .then(addNewForm);
        }

        function selectForm (form) {
            //$scope.selectedForm = form;
            vm.form = {
                _id: form._id,
                title: form.title,
                userId: form.userId
            };

        }

        function formCallback(forms) {
            vm.forms = forms.data;
        }

        function addNewForm() {
            init();
        }

        function clickedForm(form) {
            console.log("clickedForm");
            $location.path("/form/" + form._id + "/fields");
        }

    }


})();