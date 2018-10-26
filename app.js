//express
var express = require("express");
var app = express();


//mongoose connection
var mongoose = require('mongoose');
var mongoURL = 'mongodb://localhost:27017/myDB';
mongoose.connect(mongoURL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//allows us to read data from page by looking at body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Schema
var VehicleInspectionFormSchema = require('./models/VehicleInspectionFormSchema.js');

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//rendering stuff
app.get("/", function(req, res){
  res.render("landing");
});

app.get("/customerInputForm", function(req, res){
  res.render("customerInputForm");
});

app.get("/repairOrderForm", function(req, res){
  res.render("repairOrderForm");
});

app.get("/vehicleInputForm", function(req, res){
  res.render("vehicleInputForm");
});

app.get("/vehicleInspectionForm", function(req, res){
  res.render("vehicleInspectionForm");
});

// Whoever is not on aws cloud 9, your ports will be different.
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started.");
});

//listens to vehicleInspectionForm
app.post('/vehicleInspectionForm', function(req,res) {
  var newVehicleInspectionForm = new VehicleInspectionFormSchema({
    Name: req.body.Name,
    Mileage: req.body.Mileage,
    Year_Make_Model: req.body.Year_Make_Model,
    VIN: req.body.VIN,
    License: req.body.License,
    email: req.body.email
  });
  newVehicleInspectionForm.save(function(error) {
    res.send("saved?");
    if (error) {
      console.error(error);
    }
  });
});