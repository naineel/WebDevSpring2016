/**
 * Created by naineel on 2/22/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('FieldsController', FieldsController);

    function FieldsController($routeParams, $scope, FieldService, UserService, $location) {

        var formId = $routeParams.formId;
        var currentUser = UserService.getCurrentUser();

        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.updateModel = updateModel;

        function updateModel() {
            FieldService.updateFields(formId, $scope.fields);
        }

        function init() {
            FieldService.getFieldsForForm(formId)
                .then(function FormFieldsCallback(response) {
                    $scope.fields = response.data;
                });
        }

        init();

        $scope.$location = $location;

        function addField(fieldType) {
            if (fieldType) {
                switch (fieldType) {
                    case 'SINGLE_LINE_TEXT':
                        FieldService.createFieldForForm(formId, {
                                "_id": null,
                                "label": "New Text Field",
                                "type": "TEXT",
                                "placeholder": "New Field"
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    case 'MULTI_LINE_TEXT':
                        FieldService.createFieldForForm(formId, {
                                "_id": null,
                                "label": "New Text Field",
                                "type": "TEXTAREA",
                                "placeholder": "New Field"
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    case 'DATE':
                        FieldService.createFieldForForm(formId, {
                                "_id": null,
                                "label": "New Date Field",
                                "type": "DATE"
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    case 'DROPDOWN':
                        FieldService.createFieldForForm(formId, {
                                "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                                    {"label": "Option 1", "value": "OPTION_1"},
                                    {"label": "Option 2", "value": "OPTION_2"},
                                    {"label": "Option 3", "value": "OPTION_3"}
                                ]
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    case 'CHECKBOXES':
                        FieldService.createFieldForForm(formId, {
                                "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                    {"label": "Option A", "value": "OPTION_A"},
                                    {"label": "Option B", "value": "OPTION_B"},
                                    {"label": "Option C", "value": "OPTION_C"}
                                ]
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    case 'RADIO':
                        FieldService.createFieldForForm(formId, {
                                "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                    {"label": "Option X", "value": "OPTION_X"},
                                    {"label": "Option Y", "value": "OPTION_Y"},
                                    {"label": "Option Z", "value": "OPTION_Z"}
                                ]
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    default:
                        break;
                }
            }
        }

        function removeField(field) {
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(successCallback);
        }

        function successCallback(response) {
            $scope.fields = response.data.fields;
        }

    }
}());