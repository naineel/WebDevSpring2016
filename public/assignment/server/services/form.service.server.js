/**
 * Created by naineel on 3/18/16.
 */
module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getAllformsUsingUserId);
    app.get("/api/assignment/form/:formId", getFormForFormId);
    app.delete("/api/assignment/form/:formId", deleteFormUsingFormId);
    app.post("/api/assignment/user/:userId/form", createFormUsingUserId);
    app.put("/api/assignment/form/:formId", updateFormUsingFormId);

    function getAllformsUsingUserId(req, res) {
        var userId = req.params.userId;
        formModel
            .findAllFormsForUser(userId)
            .then(
                function(forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFormForFormId(req, res) {
        var formId = req.params.formId;
        console.log("FormId: " + formId);
        formModel
            .findFormById(formId)
            .then(
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormUsingFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .deleteFormById(formId)
            .then(
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function createFormUsingUserId(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel
            .createFormForUser(userId, form)
            .then(
                function(form) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormUsingFormId(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel
            .updateFormById(formId, form)
            .then(
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

};