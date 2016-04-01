/**
 * Created by naineel on 3/18/16.
 */
module.exports = function(app, fieldModel, uuid) {
    app.get("/api/assignment/form/:formId/field", getAllfieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldUsingId);
    app.post("/api/assignment/form/:formId/field", createFormUsingFieldId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldUsingId);
    app.put("/api/assignment/form/:formId/field", updateAllFields);

    function getAllfieldsForFormId(req, res) {
        var formId = req.params.formId;
        fieldModel.findAllFieldsForFormByFormId(formId)
            .then(
                function (fields) {
                    res.json(fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        //res.json(fields);
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFieldByFieldIdAndFormId(formId, fieldId)
            .then(
                function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        //if (field) {
        //    res.json(field);
        //    return;
        //} else {
        //    res.json({Error: "Field does not exist"});
        //}
    }

    function deleteFieldUsingId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        //var form = fieldModel.deleteFieldByFieldIdAndFormId(formId, fieldId);
        //if (form) {
        //    res.send(form);
        //    return;
        //}
        //res.json({Error: "Field does not exist"});
        fieldModel
            .deleteFieldByFieldIdAndFormId(formId, fieldId)
            .then(
                function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormUsingFieldId(req, res) {
        var field = req.body;
        //field._id = uuid.v4();
        var formId = req.params.formId;
        //var form = fieldModel.createFieldInForm(formId, field);
        //res.send(form);
        fieldModel.createFieldInForm(formId, field)
            .then(
                function (form) {
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldUsingId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        fieldModel.updateFieldInForm(formId, fieldId, newField)
            .then(
                function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        //if(field) {
        //    res.json(form);
        //    return;
        //} else {
        //    res.json({Error: "Field does not exist"});
        //}
    }

    function updateAllFields(req, res) {
        fieldModel.updateAllFields(req.params.formId, req.body)
            .then(
              function (form) {
                  res.json(form);
              },
                function (err) {
                    res.status(400).send(err);
                }
            );
        //res.json(form);
    }
};