var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var mongoURL = 'mongodb://localhost:27017/myDB';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// Who added these 2, why do we need it?
app.use(express.json());       // to support JSON-encoded bodies
app.use(bodyParser.json());    //allows us to read data from page by looking at data

// Connect to mongoDB

// SCHEMA
var lastServiceSchema = require('./models/lastServiceSchema.js');
var vehicleSchema = require('./models/vehicleSchema.js');
var VehicleInspectionFormSchema = require('./models/VehicleInspectionFormSchema.js');
var customerSchema = require('./models/customerSchema.js');
var Schema = mongoose.Schema;
var Customer = mongoose.model("CustomerModels", customerSchema.customerSchema);



//mongoose connection
mongoose.connect(mongoURL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Models
var VehicleInspectionFormSchema = require('./models/VehicleInspectionFormSchema.js');
var jobModel = require("./models/JobSchema.js");
var repairOrderModel = require("./models/RepairOrderFormSchema.js");


// ------- Routes -------

// Landing Page
app.get("/", function(req, res){
  res.render("landing");
});

// Dashboard
app.get("/dashboard", function(req, res) {
  res.render("dashboard");
});

// Customer Input
app.get("/customerInputForm", function(req, res){
  res.render("customerInputForm");
});

app.post("/customerInputForm", function(req, res){
  res.redirect("/customerInputForm");
});

// Vehicle Input
app.get("/vehicleInputForm", function(req, res) {
  res.render("vehicleInputForm");
});

app.post("/vehicleInputForm", function(req, res) {
  res.redirect("/vehicleInputForm");
});

// Repair Order Form
app.get("/repairOrderForm", function(req, res){
  res.render("repairOrderForm");
});

app.get("/searchPage", function(req, res){
  
  /*  uncomment this to add this customer to database upon loading search page
  var newCustomer = new customerSchema({
    customerID: 123456,
    firstName: "John", 
    lastName: "Wick",
    address: "666 Nonya Business",
    city: "New York",
    state: "NY",
    zip: 45672,
    email: "johnwick@youdieded.com",
    cell: 1234561234,
    work: 7891231475,
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
  });
  
  
  newCustomer.save(function(error) {
    //res.render("searchPage");
    if (error) {
      console.error(error);
    }
  });
  */
  
  res.render("searchPage");
});

app.post("/populateROfromName", function(req, res) {
  customerSchema.findOne( { firstName : req.body.firstName, lastName: req.body.lastName } , function (err, result) {
        if (err) 
          console.error(err);
        if (result) {
          res.render("repairOrderForm", {Customer:result, Vehicle:result.vehicles[0]});
          //only works if customer has a vehicle
        }
        else {
          console.log("no result found, display error?");
        }
    });
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


// Vehicle Inspection Form
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


// Customer Page
var Customer = {
    customerID: 123456,
    firstName: "John", 
    lastName: "Wick",
    street: "666 Nonya Business",
    city: "New York",
    state: "NY",
    zip: 45672,
    email: "johnwick@youdied.com",
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


// searchPage
var DupCustomers = {
  sameCustomer: [
    {
      firstName: "John",
      lastName: "Smith",
      email: "johnsmith@example.com",
      cellPhone: 1239879876,
      workPhone: 1236546543
    },
    {
      firstName: "John",
      lastName: "Wick",
      email: "johnwick@youdied.com",
      cellPhone: 1234561234,
      workPhone: 7891231475,
    },
    {
      firstName: "John",
      lastName: "Snow",
      email: "johnsnow@winterfell.com",
      cellPhone: 1237657654,
      workPhone: 1235675678,
    }
  ]
};

app.get("/searchPage", function(req, res) {
  res.render("searchPage", {DupCustomers:DupCustomers});
});


// Vehicle Page
var Vehicle = {
    make: "Honda",
    model: "S2000",
    year: "2007",
    color: "Red",
    license: "2SUNEJR",
    vin: "1G3NL52TX1C221106",
    mileage: 112024,
    lastService: "12-4-2017",
    RO: [
      { 
        number: 123457,
        date: "12-4-2017",
        desc: "Oil Change",
        totalCost: "$49.99",
        mileage: 110000
      },
      { 
        number: 123457,
        date: "9-4-2017",
        desc: "Oil Change",
        totalCost: "$49.99",
        mileage: 105000
      }
    ]
};

app.get("/vehiclePage", function(req, res) {
  res.render("vehiclePage", {Vehicle:Vehicle});
});


// Keep this at the bottom of the page.
// Whoever is not on aws cloud 9, your ports will be different.
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started.");
});