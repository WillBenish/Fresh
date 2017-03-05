var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");

//controllers
var prayerController = require("./controllers/prayerController");

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json())
app.use("/api", prayerController);

app.listen(7777, function () {
    console.log("Started listening on port", 7777);
});

// Connect to mongodb database
mongoose.connect("mongodb://test123:test123@ds059644.mlab.com:59644/pray");
 console.log("MONGO?");