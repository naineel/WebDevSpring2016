/**
 * Created by naineel on 3/18/16.
 */
module.exports = function(app, model) {
    app.get("/apt/assignment/user/:userId/form", getAllformsUsingUserId);
    app.get("/apt/assignment/form/:formId", getFormForFormId);
    app.delete("/apt/assignment/form/:formId", deleteFormUsingFormId);
    app.post("/api/assignment/user/:userId/form", createFormUsingUserId);
    app.put("/api/assignment/form/:formId", updateFormUsingFormId);

    function getAllformsUsingUserId(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var newForm = model.createFormForUser(userId, form);
        res.json(newForm);
    }

    function getFormForFormId(req, res) {
        var formId = req.param.formId;
        var form = model.findAllFormsForUser(formId);
        res.json(form);
    }

    function deleteFormUsingFormId(req, res) {
        var formId = req.param.formId;
        var forms = model.deleteFormById(formId);
        res.json(forms);
    }

    function createFormUsingUserId(req, res) {
        var userId = req.param.userId;
        var form = req.body;
        var newForm = model.createFormForUser(userId, form);
        res.json(newForm);
    }

    function updateFormUsingFormId(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        form = model.updateFormById(formId, form);
        res.json(form);
    }

};