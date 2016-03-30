/**
 * Created by naineel on 3/18/16.
 */
module.exports = function(app, model, uuid) {
    app.get("/api/assignment/form/:formId/field", getAllfieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldUsingId);
    app.post("/api/assignment/form/:formId/field", createFormUsingFieldId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldUsingId);
    app.put("/api/assignment/form/:formId/field", updateAllFields);

    function getAllfieldsForFormId(req, res) {
        var formId = req.params.formId;
        var fields = model.findAllFieldsForFormByFormId(formId);
        res.json(fields);
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = model.findFieldByFieldIdAndFormId(formId, fieldId);
        if (field) {
            res.json(field);
            return;
        } else {
            res.json({Error: "Field does not exist"});
        }
    }

    function deleteFieldUsingId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = model.deleteFieldByFieldIdAndFormId(formId, fieldId);
        if (form) {
            res.send(form);
            return;
        }
        res.json({Error: "Field does not exist"});
    }

    function createFormUsingFieldId(req, res) {
        var field = req.body;
        field._id = uuid.v4();
        var formId = req.params.formId;
        var form = model.createFieldInForm(formId, field);
        res.send(form);
    }

    function updateFieldUsingId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        var field = model.updateFieldInForm(formId, fieldId, newField);
        if(field) {
            res.json(form);
            return;
        } else {
            res.json({Error: "Field does not exist"});
        }
    }

    function updateAllFields(req, res) {
        var form = model.updateAllFields(req.params.formId, req.body);
        res.json(form);
    }
};