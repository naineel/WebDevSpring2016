#!/bin/env node
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require('node-uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.get('/sayHello', rootRequest);

function rootRequest(req, res){
    res.send('hello world');
}
var userModel = require("./public/assignment/server/models/user.model")();
var formModel = require("./public/assignment/server/models/form.model")();
var userService = require("./public/assignment/server/services/user.service.server")(app, userModel);
var formService = require("./public/assignment/server/services/form.service.server")(app, formModel);

app.listen(port, ipaddress);
