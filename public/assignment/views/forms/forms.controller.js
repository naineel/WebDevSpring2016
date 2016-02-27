/**
 * Created by naineel on 2/22/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService){
        var currentUser = $rootScope.newUser;
        $scope.$location = $location;
        FormService.findAllFormsForUser(currentUser._id, addNewForm);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm (form) {
            if (form) {
            form._id = (new Date).getTime();
            form.userId = currentUser._id;
            console.log(form);
            console.log(currentUser._id);
            FormService.createFormForUser(currentUser._id, form, addNewForm);
            $scope.form = null;
            }
        }

        function updateForm (form) {
            FormService.updateFormById(form._id, form, addNewForm);
            $scope.form = null;
        }

        function deleteForm (form) {
            console.log("Delete form " + form);
            FormService.deleteFormById(form, addNewForm);
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
            $scope.forms = forms;
        }

        function addNewForm() {
            FormService.findAllFormsForUser(currentUser._id, formCallback);
        }

    }

})();