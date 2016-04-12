#!/bin/env node
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require('node-uuid');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';


app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);
ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(session({
    secret: "thisIsMySecret",
    resave: true,
    saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/sayHello', rootRequest);

function rootRequest(req, res){
    res.send('hello world');
}

require("./public/assignment/server/app.js")(app, uuid, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);
