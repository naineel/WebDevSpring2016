/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService){
        var currentUser = $rootScope.newUser;
        $scope.$location = $location;
        FormService.findAllFormsForUser(currentUser._id)
            .then(formCallback);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.clickedForm = clickedForm;

        function addForm (form) {
            if (form) {
                form._id = (new Date).getTime();
                form.userId = currentUser._id;
                console.log(form);
                console.log(currentUser._id);
                FormService
                    .createFormForUser(currentUser._id, form)
                    .then(addNewForm);
                $scope.form = null;
            }
        }

        function updateForm (form) {
            FormService
                .updateFormById(form._id, form)
                .then(addNewForm);
            $scope.form = null;
        }

        function deleteForm (form) {
            console.log("Delete form " + form);
            FormService
                .deleteFormById(form)
                .then(addNewForm);
        }

        function selectForm (form) {
            //$scope.selectedForm = form;
            $scope.form = {
                _id: form._id,
                title: form.title,
                userId: form.userId
            };

        }

        function formCallback(forms) {
            $scope.forms = forms.data;
        }

        function addNewForm() {
            console.log("AddNewForm");
            FormService
                .findAllFormsForUser(currentUser._id)
                .then(formCallback);
        }

        function clickedForm(form) {
            $location.path("/form/" + form._id + "/fields");
        }

    }


})();