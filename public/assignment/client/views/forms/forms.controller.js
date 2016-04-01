/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService, UserService){
        var currentUser = $rootScope.newUser;
        $scope.$location = $location;

        function init() {
            FormService
                .findAllFormsForUser(currentUser._id)
                .then(formCallback);
        }

        init();

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.clickedForm = clickedForm;

        function addForm (form) {
            form.userId = currentUser._id;
            FormService
                .createFormForUser(currentUser._id, form)
                .then(addNewForm);
            $scope.form = null;
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
                .deleteFormById(form._id)
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
            init();
        }

        function clickedForm(form) {
            console.log("clickedForm");
            $location.path("/form/" + form._id + "/fields");
        }

    }


})();