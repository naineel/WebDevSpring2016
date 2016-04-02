/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function () {

    angular
        .module('FormBuilderApp')
        .controller('ModalInstance', function ($uibModalInstance, editField, popupHeader) {
            var vm = this;
            vm.editField = editField;
            vm.popupHeader = popupHeader;

            if(vm.editField.options.length > 0) {
                console.log(vm.editField.options);
                var formattedOptions = null;
                for (var index =0; index< vm.editField.options.length; index++) {
                    console.log(vm.editField.options[index]);
                    var option = vm.editField.options[index];
                    if (formattedOptions) {
                        formattedOptions = formattedOptions + "\n" + option.value + ":" + option.label;
                    } else {
                        formattedOptions = option.value + ":" + option.label;
                    }
                }

                vm.editField.placeholder = formattedOptions;
            }

            vm.submit = function(model) {
                if (model.options.length > 0) {
                    var temp = model.placeholder.split('\n');
                    var newOptions = [];
                    for (var index = 0; index < temp.length; index++) {
                        var tempString = temp[index];
                        newOptions.push({
                            value: tempString.split(':')[0],
                            label: tempString.split(':')[1]
                        })
                    }
                    model.options = newOptions;
                }
                $uibModalInstance.close(model);
            };

            vm.cancel = function() {
                $uibModalInstance.dismiss();
            };
        });

    angular
        .module('FormBuilderApp')
        .controller('FieldsController', FieldsController);

    function FieldsController($routeParams, FieldService, UserService, $location,
                              $uibModal) {
        var vm = this;
        var formId = $routeParams.formId;
        var currentUser = UserService.getCurrentUser();


        function init() {
            FieldService.getFieldsForForm(formId)
                .then(FormFieldsCallback);
        }

        function FormFieldsCallback(responses) {
            vm.fields = responses.data.fields;
        }

        init();
        vm.$location = $location;


        vm.fieldType = null;
        vm.availableOptions = [{id: '1', name: 'Single Line Text Field'},
                {id: '2', name: 'Multi Line Text Field'},
                {id: '3', name: 'Date Field'},
                {id: '4', name: 'Checkboxes Field'},
                {id: '5', name: 'Dropdown Field'},
                {id: '6', name: 'Radio Buttons Field'}];

        vm.open = function (fieldType, field) {

            var modalInstance = null;
            var currentLabel = field.label,
                currentPlaceholder = field.placeholder;

            switch (fieldType) {
                case 'TEXT':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Single Line Field'
                            },
                            editField: field
                        },
                        controllerAs: 'modelTwo'
                    });
                    break;
                case 'EMAIL':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Email Field'
                            },
                            editField: field
                        },
                        controllerAs: 'modelTwo'
                    });
                    break;
                case 'TEXTAREA':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Multiple Lines Field'
                            },
                            editField: field
                        },
                        controllerAs: 'modelTwo'
                    });
                    break;
                case 'DATE':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholderDate.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Date Field'
                            },
                            editField: field
                        },
                        controllerAs: 'modelTwo'
                    });
                    break;
                case 'OPTIONS':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Dropdown Field'
                            },
                            editField: field
                        },
                        controllerAs: 'modelTwo'
                    });
                    break;
                case 'CHECKBOXES':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Checkbox Field'
                            },
                            editField: field
                        },
                        controllerAs: 'modelTwo'
                    });
                    break;
                case 'RADIOS':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Radio Button Field'
                            },
                            editField: field
                        },
                        controllerAs: 'modelTwo'
                    });
                    break;
                default:
                    break;
            }

            modalInstance.result.then(function (model) {
                field.label = model.label;
                field.placeholder = model.placeholder;
                FieldService.updateFields(formId, vm.fields);
                console.log(field);
            }, function () {
                field.label = currentLabel;
                field.placeholder = currentPlaceholder;
                //console.log("Cancel Pressed");
            });

        };


        vm.addField = addField;
        vm.removeField = removeField;
        vm.updateModel = updateModel;

        function updateModel() {
            FieldService.updateFields(formId, vm.fields);
        }

        function addField(fieldType) {
            console.log("This is the field type: ");
            console.log(fieldType);
            if (fieldType) {
                switch (fieldType) {
                    case "Single Line Text Field":
                        FieldService.createFieldForForm(formId, {
                                "label": "New Text Field",
                                "type": "TEXT",
                                "placeholder": "New Field"
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
                            });
                        break;
                    case 'Multi Line Text Field':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Text Field",
                                "type": "TEXTAREA",
                                "placeholder": "New Field"
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
                            });
                        break;
                    case 'Date Field':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Date Field",
                                "type": "DATE"
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
                            });
                        break;
                    case 'Dropdown Field':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Dropdown", "type": "OPTIONS", "options": [
                                    {"label": "Option 1", "value": "OPTION_1"},
                                    {"label": "Option 2", "value": "OPTION_2"},
                                    {"label": "Option 3", "value": "OPTION_3"}
                                ]
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
                            });
                        break;
                    case 'Checkboxes Field':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                    {"label": "Option A", "value": "OPTION_A"},
                                    {"label": "Option B", "value": "OPTION_B"},
                                    {"label": "Option C", "value": "OPTION_C"}
                                ]
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
                            });
                        break;
                    case 'Radio Buttons Field':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                    {"label": "Option X", "value": "OPTION_X"},
                                    {"label": "Option Y", "value": "OPTION_Y"},
                                    {"label": "Option Z", "value": "OPTION_Z"}
                                ]
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
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

        function successCallback(fields) {
            vm.fields = fields.data.fields;
        }

    }
}());