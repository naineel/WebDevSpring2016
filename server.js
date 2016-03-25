#!/bin/env node
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require('node-uuid');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(session({ secret: "thisIsMySecret"}));
app.use(cookieParser());

app.get('/sayHello', rootRequest);

function rootRequest(req, res){
    res.send('hello world');
}
var userModel = require("./public/assignment/server/models/user.model")();
var formModel = require("./public/assignment/server/models/form.model")();
var userService = require("./public/assignment/server/services/user.service.server")(app, userModel, uuid);
var formService = require("./public/assignment/server/services/form.service.server")(app, formModel, uuid);
var fieldService = require("./public/assignment/server/services/field.service.server")(app, formModel, uuid);

require("./public/project/server/app.js")(app);
//var movieModel = require("./public/project/server/models/movie.model.server.js");
//var userModelTwo = require("./public/project/server/models/user.model.server.js");
//
//require("./public/project/server/services/movie.service.server")(app, movieModel, userModelTwo);
//require("./public/project/server/services/user.service.server")(app, movieModel, userModelTwo);

app.listen(port, ipaddress);
