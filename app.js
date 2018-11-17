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

// SCHEMA
var VehicleInspectionFormSchema = require('./models/VehicleInspectionFormSchema.js');

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

var Schema = mongoose.Schema;


app.get("/", function(req, res){
  res.render("landing");
});

// Create models
var jobModel = require("./models/JobSchema.js");
var repairOrderModel = require("./models/RepairOrderFormSchema.js");

// initializes vehicle and last service object models
var lastServiceObj = require('./models/lastServiceSchema.js');
var vehicleObj = require('./models/vehicleSchema.js');
// initializes customer object model
var customerObj = require('./models/customerSchema.js');


app.get("/customerInputForm", function(req, res){
  res.render("customerInputForm");
});

app.post("/customerInputForm", function(req, res){
  res.redirect("/customerInputForm");
});

app.get("/vehicleInputForm", function(req, res) {
  res.render("vehicleInputForm");
});

app.post("/vehicleInputForm", function(req, res) {
  res.redirect("/vehicleInputForm");
});

app.get("/repairOrderForm", function(req, res){
  res.render("repairOrderForm");
});

app.get("/searchPage", function(req, res){
  res.render("searchPage");
});

app.post("/repairOrderForm", function(req, res) {
 
  var repairOrderInstance = new repairOrderModel({
    repairOrderNumber: req.body.repair_order_number,
    customerID: req.body.customerID,
    VIN: req.body.VIN,
    
    mechanicID: req.body.mechanicID,
    mechanicFirstName: req.body.mechanicFirstName,
    mechanicLastName: req.body.mechanicLastName,
    
    totalCost: req.body.total_cost
  });
  repairOrderInstance.jobs.push({
    repairType: req.body.job_1_repair_type,
    complaint: req.body.job_1_complaint,
    cause: req.body.job_1_cause,
    resolution: req.body.job_1_resolution,
    cost: req.body.job_1_cost
  });
  
  repairOrderInstance.jobs.push({
    repairType: req.body.job_2_repair_type,
    complaint: req.body.job_2_complaint,
    cause: req.body.job_2_cause,
    resolution: req.body.job_2_resolution,
    cost: req.body.job_2_cost
  });
  
  repairOrderInstance.jobs.push({
    repairType: req.body.job_3_repair_type,
    complaint: req.body.job_3_complaint,
    cause: req.body.job_3_cause,
    resolution: req.body.job_3_resolution,
    cost: req.body.job_3_cost
  });
  
  repairOrderInstance.save(function (err) {
    if (err) console.log(err);
  });
  res.redirect("/repairOrderForm");
});


//listens to vehicleInspectionForm
app.get("/vehicleInspectionForm", function(req, res) {
  res.render("vehicleInspectionForm");
});

app.post('/vehicleInspectionForm', function(req,res) {
  
  var newVehicleInspectionForm = new VehicleInspectionFormSchema({
    Name: req.body.Name,
    Mileage: req.body.Mileage,
    Year_Make_Model: req.body.Year_Make_Model,
    VIN: req.body.VIN,
    License: req.body.License,
    email: req.body.email,
  });
  newVehicleInspectionForm.INTERIOR_EXTERIOR.Exterior_Body = req.body["windshield-glass"];
  newVehicleInspectionForm.INTERIOR_EXTERIOR.WindShield_Glass = req.body["windshield-glass"];
  newVehicleInspectionForm.INTERIOR_EXTERIOR.Wipers = req.body["wipers"];
  newVehicleInspectionForm.INTERIOR_EXTERIOR.Exterior_Lights = req.body["exterior-lights"];
  newVehicleInspectionForm.INTERIOR_EXTERIOR.Interior_Lights = req.body["interior-lights"];
  newVehicleInspectionForm.INTERIOR_EXTERIOR.AC_Operation = req.body["ac-operation"];
  newVehicleInspectionForm.INTERIOR_EXTERIOR.Heating = req.body["heating"];
  newVehicleInspectionForm.INTERIOR_EXTERIOR.Other = req.body["interior-exterior-other"];
  newVehicleInspectionForm.UNDERHOOD.Engine_Oil = req.body["engine-oil"];
  newVehicleInspectionForm.UNDERHOOD.Brake_Fluid = req.body["brake-fluid"];
  newVehicleInspectionForm.UNDERHOOD.Power_Steering_Fluid = req.body["ps-fluid"];
  newVehicleInspectionForm.UNDERHOOD.Washer_Fluid = req.body["washer-fluid"];
  newVehicleInspectionForm.UNDERHOOD.Belts_and_Hoses = req.body["belts-hoses"];
  newVehicleInspectionForm.UNDERHOOD.Antifreeze_Coolant = req.body["coolant"];
  newVehicleInspectionForm.UNDERHOOD.Air_Filter = req.body["air-filter"];
  newVehicleInspectionForm.UNDERHOOD.Cabin_Filter = req.body["cabin-filter"];
  newVehicleInspectionForm.UNDERHOOD.Fuel_Filter = req.body["fuel-filter"];
  newVehicleInspectionForm.UNDERHOOD.Spark_Plugs = req.body["sparkplugs"];
  newVehicleInspectionForm.UNDERHOOD.Battery_Charge = req.body["battery-charge"];
  newVehicleInspectionForm.UNDERHOOD.Battery_Condition = req.body["battery-condition"];
  newVehicleInspectionForm.UNDERHOOD.Cables_Connections = req.body["wiring"];
  newVehicleInspectionForm.UNDERHOOD.Other = req.body["under-hood-other"];
  newVehicleInspectionForm.UNDER_VEHICLE.Brakes_Pads_Shoes = req.body["brakes"];
  newVehicleInspectionForm.UNDER_VEHICLE.Brake_Lines_Hoses = req.body["brake-line"];
  newVehicleInspectionForm.UNDER_VEHICLE.Steering_System = req.body["steering-system"];
  newVehicleInspectionForm.UNDER_VEHICLE.Shocks_Struts = req.body["shocks"];
  newVehicleInspectionForm.UNDER_VEHICLE.Driveline_Axles_CV_Shaft = req.body["driveline"];
  newVehicleInspectionForm.UNDER_VEHICLE.Exhaust_System = req.body["exhaust"];
  newVehicleInspectionForm.UNDER_VEHICLE.Fuel_Lines_Hoses = req.body["fuel-lines"];
  newVehicleInspectionForm.UNDER_VEHICLE.Other = req.body["under-vehicle-other"];
  newVehicleInspectionForm.TIRES.LF = req.body["lf-tread-depth"];
  newVehicleInspectionForm.TIRES.RF = req.body["rf-tread-depth"];
  newVehicleInspectionForm.TIRES.LR = req.body["lr-tread-depth"];
  newVehicleInspectionForm.TIRES.RR = req.body["rr-tread-depth"];
  newVehicleInspectionForm.TIRES.LF_Tread_Depth = req.body["lf-tread"];
  newVehicleInspectionForm.TIRES.RF_Tread_Depth = req.body["rf-tread"];
  newVehicleInspectionForm.TIRES.LR_Tread_Depth = req.body["lr-tread"];
  newVehicleInspectionForm.TIRES.RR_Tread_Depth = req.body["rr-tread"];
  newVehicleInspectionForm.TIRES.Wear_Pattern_Damage.LF = req.body["lf-wear"];
  newVehicleInspectionForm.TIRES.Wear_Pattern_Damage.RF = req.body["rf-wear"];
  newVehicleInspectionForm.TIRES.Wear_Pattern_Damage.LR = req.body["lr-wear"];
  newVehicleInspectionForm.TIRES.Wear_Pattern_Damage.RR = req.body["rr-wear"];
  newVehicleInspectionForm.TIRES.Air_Pressure.Front.LF = req.body["lf-psi"];
  newVehicleInspectionForm.TIRES.Air_Pressure.Front.RF = req.body["rf-psi"];
  newVehicleInspectionForm.TIRES.Air_Pressure.Back.LR = req.body["lr-psi"];
  newVehicleInspectionForm.TIRES.Air_Pressure.Back.RR = req.body["rr-psi"];
  newVehicleInspectionForm.Comments = req.body["comments"];
  
  newVehicleInspectionForm.save(function(error) {
    res.render("landing");
    if (error) {
      console.error(error);
    }
  });
  
});


// Dashboard
app.get("/dashboard", function(req, res) {
  res.render("dashboard");
});


// Customer Page

var Customer = {
    customerID: 123456,
    firstName: "John", 
    lastName: "Wick",
    street: "666 Nonya Business",
    city: "New York",
    state: "NY",
    zip: 45672,
    email: "johnwick@youdieded.com",
    cellPhone: 1234561234,
    workPhone: 7891231475,
    vehicles: [
      { 
        year: 2007,
        make: "Honda",
        model: "S2000",
        color: "Red",
        id: 3513513
      },
      { 
        year: 2015,
        make: "Lexus",
        model: "IS350",
        color: "Gray",
        id: 1351351
      }
    ]
};

app.get("/customerPage", function(req, res) {
  res.render("customerPage", {Customer:Customer});
});

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

// Whoever is not on aws cloud 9, your ports will be different.
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started.");
});

