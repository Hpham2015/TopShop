//express
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies

//mongoose connection
var mongoURL = 'mongodb://localhost:27017/TopShop';
mongoose.connect(mongoURL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//allows us to read data from page by looking at body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

var Schema = mongoose.Schema;

console.log("here");

app.get("/", function(req, res){
  res.render("landing");
});

// initializes vehicle and last service object models
var lastServiceObj = require('./models/lastServiceSchema.js');
var vehicleObj = require('./models/vehicleSchema.js');
// initializes customer object model
var customerObj = require('./models/customerSchema.js');

console.log("here");



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

console.log("here");
// adds new customer to DB
app.post("/customerInputForm", function(req, res){
  var newCustomerObj = new customerObj({
    customerID: req.body.customerID,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    address: req.body.street,
    city: req.body.City,
    state: req.body.State,
    zip: Number(req.body.zip),
    email: req.body.email,
    cell: req.body.cell,
    work: req.body.work
  });
  
  var vin = req.body.VIN;
  var query = vehicleObj.findOne({VIN: vin}, function (err, vehicleObj) {
    if (err) {
      res.send(err);
    }
    console.log(vehicleObj);
    newCustomerObj.vehicles.push(vehicleObj);
  
  newCustomerObj.save(function(err) {
    if (err) {
      console.log(err);
  } else {
    res.redirect("/customerInputForm");
  }
});

}); });

// adds new vehicle to DB
app.post("/vehicleInputForm", function(req, res){
  var lastServiceModelInstance = new lastServiceObj({
    date: req.body.lastServiceDate,
    odometer: Number(req.body.lastServiceOdom),
    dailyAverageMiles: Number(req.body.lastServiceDailyMiles),
    monthlyAverageMiles: Number(req.body.lastServiceMonthlyMiles)
  });
  
  var newVehicleObj = new vehicleObj({
    VIN: req.body.VIN,
    make: req.body.make,
    model: req.body.model,
    year: Number(req.body.year),
    color: req.body.color,
    type: req.body.type,
    productionDate: req.body.productionDate,
    inserviceDate: req.body.inserviceDate,
    lastService: lastServiceModelInstance
  });
  vehicleObj.create(newVehicleObj, function(err, newlyCreated) {
    if (err) {
      console.log(err);
  } else {
    res.redirect("/vehicleInputForm");
  }
});

});

// function to search for customers in database
function searchCustomer(first , last, email) {
  customerObj.find({firstName: first, lastName: last, email: email}, function (err, customer) {
    if (err) return console.log("Could not find specified customer.");
    else return customer;
  });
}

// function to search for vehicles in database
function searchVehicle(make, model, year, license) {
  vehicleObj.find({make: make, model: model, year: year, licenseNum: license}, function (err, vehicle) {
    if (err) return console.log("Could not find specified vehicle.");
    else return vehicle;
  });
}

console.log("here");

// Whoever is not on aws cloud 9, your ports will be different.
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started.");
});

