/**
 * Created by naineel on 3/18/16.
 */
module.exports = function(app, model) {
    app.get("/apt/assignment/form/:formId/field", getAllfieldsForFormId);
    app.get("/apt/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/apt/assignment/form/:formId/field/:fieldId", deleteFieldUsingId);
    app.post("/api/assignment/form/:formId/field", createFormUsingUserId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldUsingId);


};