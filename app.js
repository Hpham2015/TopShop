var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var mongoURL = 'mongodb://localhost:27017/TopShop';


app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// Who added these 2, why do we need it?
app.use(express.json());       // to support JSON-encoded bodies
app.use(bodyParser.json());    //allows us to read data from page by looking at data

// Connect to mongoDB

// Models
var jobModel = require('./models/JobSchema.js');
var lastServiceModel = require('./models/LastServiceSchema.js');
var vehicleModel = require('./models/VehicleSchema.js');
var VehicleInspectionFormModel = require('./models/VehicleInspectionFormSchema.js');
var customerModel = require('./models/CustomerSchema.js');
var repairOrderModel = require('./models/RepairOrderFormSchema.js');

//mongoose connection
mongoose.connect(mongoURL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

// adds new customer to DB
app.post("/customerInputForm", function(req, res){
  var newCustomerObj = new customerModel({
    customerID: req.body.customerID,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    street: req.body.street,
    city: req.body.City,
    state: req.body.State,
    zip: req.body.zip,
    email: req.body.email,
    cell: req.body.cell,
    work: req.body.work
  });
  newCustomerObj.save(function(err) {
    if (err) console.log(err);
    res.redirect("/customerInputForm");
  });
});

// Vehicle Input
app.get("/vehicleInputForm", function(req, res) {
  res.render("vehicleInputForm");
});

// adds new vehicle to DB
app.post("/vehicleInputForm", function(req, res){
  var lastServiceModelInstance = new lastServiceModel({ // declare with default values
    date: '1-1-00',
    odometer: 0,
    dailyAverageMiles: 0,
    monthlyAverageMiles: 0
  });
  
  var newVehicleObj = new vehicleModel({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    licenseNum: req.body.license,
    VIN: req.body.vin,
    color: req.body.color,
    type: req.body.type,
    mileage: req.body.mileage,
    lastSrvc: lastServiceModelInstance
  });
  
  newVehicleObj.save(function(err) {
    if (err) console.log(err);
    res.redirect("/vehicleInputForm");
  });

});

// Repair Order Form
app.get("/repairOrderForm", function(req, res){
  res.render("repairOrderForm");
});

/*
app.get("/searchPage", function(req, res){
  
  //  uncomment this to add this customer to database upon loading search page
  
  var lastService1 = new lastServiceModel({
    date: new Date('December 1, 1111 01:11:11'),
    odometer: 11111,
    dailyAverageMiles: 11111,
    monthlyAverageMiles: 11111
  });
  
  var lastService2 = new lastServiceModel({
    date: new Date('December 2, 2222 02:22:22'),
    odometer: 22222,
    dailyAverageMiles: 22222,
    monthlyAverageMiles: 22222
  });
  
  var lastService3 = new lastServiceModel({
    date: new Date('December 3, 3333 03:33:33'),
    odometer: 33333,
    dailyAverageMiles: 33333,
    monthlyAverageMiles: 33333
  });
  
  var newVehicle1 = new vehicleModel({
    customerID: 1111111111,
    make: "make11111",
    model: "model11111",
    year: 1111,
    licenseNum: "License1",
    VIN: 111,
    color: "color111",
    type: "type1111",
    mileage: 11111,
    lastSrvc: lastService1
  });
  
  var newVehicle2 = new vehicleModel({
    customerID: 2222222222,
    make: "make22222",
    model: "model22222",
    year: 2222,
    licenseNum: "License2",
    VIN: 222,
    color: "color222",
    type: "type2222",
    mileage: 22222,
    lastSrvc: lastService2
  });
  
  var newVehicle3 = new vehicleModel({
    customerID: 3333333333,
    make: "make33333",
    model: "model33333",
    year: 3333,
    licenseNum: "License3",
    VIN: 333,
    color: "color333",
    type: "type3333",
    mileage: 33333,
    lastSrvc: lastService3
  });
  
  var newCustomer1 = new customerModel({
    customerID: 1111111111,
    firstName: "John", 
    lastName: "Connor",
    street: "111 Nonya Business",
    city: "New York",
    state: "NY",
    zip: 11111,
    email: "11111@youdieded.com",
    cell: 1231111111,
    work: 1111111111,
    vehicles: [
      newVehicle1,
      newVehicle2,
      newVehicle3
    ]
  });
  
  var newCustomer2 = new customerModel({
    customerID: 2222222222,
    firstName: "John", 
    lastName: "Connor",
    street: "22222 Nonya Business",
    city: "New York",
    state: "NY",
    zip: 22222,
    email: "222222222@youdieded.com",
    cell: 2222222222,
    work: 2222222222,
    vehicles: [
      newVehicle1,
      newVehicle2
    ]
  });
  
  var newCustomer3 = new customerModel({
    customerID: 3333333333,
    firstName: "John", 
    lastName: "Conner",
    street: "3333333 Nonya Business",
    city: "New York",
    state: "NY",
    zip: 3333333,
    email: "johnwick@youdieded.com",
    cell: 3333333333,
    work: 3333333333,
    vehicles: [
      newVehicle1
    ]
  });
  
  var jobs1 = new jobModel({
    repairType: "repairType1",
    complaint: "Complaint11",
    cause: "Cause111",
    resolution: "Resolution1111",
    cost: "Cost11111"
  });
  
  var jobs2 = new jobModel({
    repairType: "repairType2",
    complaint: "Complaint22",
    cause: "Cause222",
    resolution: "Resolution2222",
    cost: "Cost22222"
  });
  
  var jobs3 = new jobModel({
    repairType: "repairType3",
    complaint: "Complaint33",
    cause: "Cause333",
    resolution: "Resolution3333",
    cost: "Cost33333"
  });
  
  var vehicleInspecion1 = new VehicleInspectionFormModel({
    Name: "Name111",
    Mileage: 111,
    Year_Make_Model: "Yearmakemodel111",
    VIN: 111,
    License: "License1",
    email: "email1",
    Comments: "1car comment",
    Inspected_on: new Date('December 1, 1111 01:11:11')
  });
  
  var vehicleInspecion2 = new VehicleInspectionFormModel({
    Name: "Name222",
    Mileage: 222,
    Year_Make_Model: "Yearmakemodel222",
    VIN: 222,
    License: "License2",
    email: "email2",
    Comments: "2car comment",
    Inspected_on: new Date('December 2, 2222 02:22:22')
  });
  
  var vehicleInspecion3 = new VehicleInspectionFormModel({
    Name: "Name333",
    Mileage: 333,
    Year_Make_Model: "Yearmakemodel333",
    VIN: 333,
    License: "License3",
    email: "email3",
    Comments: "3car comment",
    Inspected_on: new Date('December 3, 3333 03:33:33')
  });

  var repairOrder1 = new repairOrderModel({
    repairOrderNumber: "1",
    customerID: "1111111111",
    VIN: "111",
    inspectionReport: vehicleInspecion1,
    mechanicID: "11111",
    mechanicFirstName: "firstname111",
    mechanicLastName: "lastname111",
    jobs: jobs1,
    totalCost: "111"
  });
  
  var repairOrder2 = new repairOrderModel({
    repairOrderNumber: "2",
    customerID: "2222222222",
    VIN: "222",
    inspectionReport: vehicleInspecion2,
    mechanicID: "22222",
    mechanicFirstName: "firstname222",
    mechanicLastName: "lastname222",
    jobs: jobs2,
    totalCost: "222"
  });
  
  var repairOrder3 = new repairOrderModel({
    repairOrderNumber: "3",
    customerID: "3333333333",
    VIN: "111",
    inspectionReport: vehicleInspecion3,
    mechanicID: "33333",
    mechanicFirstName: "firstname333",
    mechanicLastName: "lastname333",
    jobs: jobs3,
    totalCost: "333"
  });
  
  newCustomer1.save(function(error) {
    //res.render("searchPage");
    if (error) {
      console.error(error);
    }
  });
  
  newCustomer2.save(function(error) {
    //res.render("searchPage");
    if (error) {
      console.error(error);
    }
  });
  
  newCustomer3.save(function(error) {
    //res.render("searchPage");
    if (error) {
      console.error(error);
    }
  });
  
  newVehicle1.save(function(error) {
    if (error) {
      console.log(error);
    }
  });
  
  newVehicle2.save(function(error) {
    if (error) {
      console.log(error);
    }
  });
  
  newVehicle3.save(function(error) {
    if (error) {
      console.log(error);
    }
  });
  
  lastService1.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  lastService2.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  lastService3.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  repairOrder1.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  repairOrder2.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  repairOrder3.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  vehicleInspecion1.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  vehicleInspecion2.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  vehicleInspecion3.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  jobs1.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  jobs2.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  jobs3.save(function(error){
    if (error) {
      console.log(error);
    }
  });
  
  res.render("searchPage");
});
*/

app.get('/repairOrderForm/:ROnumber', function(req,res) {
  var ROnumber = req.params.ROnumber;
  //Every repair order has its own unique RO number.
  //
  //We need to search for these because we agreed to not 
  //store certain things like customers inside a repair order.
  //
  //Note that if a repair order exists, there must exist a
  //customer that owns a vehicle for which the RO is connected
  //with so all these searches should return something.
  repairOrderModel.findOne( { repairOrderNumber: ROnumber } , function (err, RO) {
        if (err) 
          console.error(err);
        if (RO) {
          customerModel.findOne( { customerID: RO.customerID } , function (err, Customer) {
                if (err) 
                  console.error(err);
                if (Customer) {
                  vehicleModel.findOne( { VIN: RO.VIN } , function (err, Vehicle) {
                        if (err) 
                          console.error(err);
                        if (Vehicle) {
                          res.render("repairOrderForm", { Customer: Customer, Vehicle: Vehicle} );
                        }
                        else {
                          console.log("No Vehicle found, display error?");
                        }
                  });
                }
                else {
                  console.log("No Customer found, display error?");
                }
          });
        }
        else {
          console.log("No RO found, display error?");
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
  
  repairOrderModel.update({repairOrderNumber: req.body.repair_order_number},
    repairOrderInstance, {upsert: true}, function(err, doc) {
      if (err) console.log("Repair Order Form existed");
      else console.log("Successfully added");
    });
  
  // repairOrderInstance.save(function (err) {
  //   if (err) console.log(err);
  // });
  res.redirect("/repairOrderForm");
});


// Vehicle Inspection Form
app.get("/vehicleInspectionForm", function(req, res) {
  res.render("vehicleInspectionForm");
});

app.post('/vehicleInspectionForm', function(req,res) {
  
  var newVehicleInspectionForm = new VehicleInspectionFormModel({
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
    customerID: "123457",
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

app.get("/customerPage/:id", function(req, res) {
  var customerID = req.params.id;
  console.log("id returned is: " + customerID);
  //we use findOne here because each customer should have their own unique ID
  customerModel.findOne( { customerID: customerID } , function (err, result) {
        if (err) 
          console.error(err);
        if (result) {
          console.log("res is:" + result);
          res.render("customerPage", { Customer: result } );
        }
        else {
          console.log("no result found for name search, display something?");
        }
    });
});

// searchPage
var DupCustomers = {
  sameCustomer: [
    //The app needs to load this or else it will give an error. 
    //This is empty because there are no search results when first loading a search page.
  ]
};

app.get("/searchPage", function(req, res) {
  res.render("searchPage", {DupCustomers:DupCustomers});
});

app.post("/searchPage", function(req, res) {
  var action = req.body.action;
  if (action == "searchByCustomerName") {
    var firstName = req.body.customerFirstName;
    var lastName = req.body.customerLastName;
    customerModel.find( { firstName : firstName, lastName: lastName } , function (err, result) {
          if (err) 
            console.error(err);
          if (result) {
            //encapsulating because alfred's code requires it
            var customers = { sameCustomer: result };
            res.render("searchPage", { DupCustomers: customers } );
          }
          else {
            console.log("no result found for name search, display something?");
          }
      });
  }
  else if (action == "searchByCustomerEmail") {
    var email = req.body.customerEmail;
    customerModel.find( { email : email } , function(err, result) {
        if (err)
            console.error(err);
        if (result) {
          console.log(result);
            //encapsulating because alfred's code requires it
            var customers = { sameCustomer: result };
            res.render("searchPage", {DupCustomers:customers} );
        }
        else {
          console.log("no result found for email search, display something?");
        }
      });
  }
  else if (action == "searchByCustomerID") {
    var id = req.body.customerID;
    customerModel.find( { customerID : id } , function(err, result) {
        if (err)
            console.error(err);
        if (result) {
          console.log(result);
            //encapsulating because alfred's code requires it
            var customers = { sameCustomer: result };
            res.render("searchPage", {DupCustomers:customers} );
        }
        else {
          console.log("no result found for email search, display something?");
        }
      });
  }
  else if (action == "searchByVIN") {
    var vin = req.body.vin;
  }
  else if (action == "searchByLicense") {
    var license = req.body.license;
  }
  else if (action == "searchByRepairOrderNumber"){
    var key = req.body.repairOrderNumber;
    var query = repairOrderModel.find({repairOrderNumber: key}, function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        if (doc === undefined || doc.length == 0) {
          res.redirect("/searchPage");
          return;
        }
        res.redirect("/repairOrderForm");
        app.locals.rofNumber = doc[0].repairOrderNumber;
        app.locals.vin = doc[0].VIN;
        app.locals.customerID = doc[0].customerID;
        
        app.locals.job_1_type = doc[0].jobs[0].repairType;
        app.locals.job_1_complaint = doc[0].jobs[0].complaint;
        app.locals.job_1_cause = doc[0].jobs[0].cause;
        app.locals.job_1_resolution = doc[0].jobs[0].resolution;
        app.locals.job_1_cost = doc[0].jobs[0].cost;
        
        app.locals.job_2_type = doc[0].jobs[1].repairType;
        app.locals.job_2_complaint = doc[0].jobs[1].complaint;
        app.locals.job_2_cause = doc[0].jobs[1].cause;
        app.locals.job_2_resolution = doc[0].jobs[1].resolution;
        app.locals.job_2_cost = doc[0].jobs[1].cost;
        
        app.locals.job_3_type = doc[0].jobs[2].repairType;
        app.locals.job_3_complaint = doc[0].jobs[2].complaint;
        app.locals.job_3_cause = doc[0].jobs[2].cause;
        app.locals.job_3_resolution = doc[0].jobs[2].resolution;
        app.locals.job_3_cost = doc[0].jobs[2].cost;
        
        app.locals.totalCost = doc[0].totalCost;
      }
    });
    
    return;
    
  } else {
    // nothing
  }
  //res.redirect("/searchPage"); This conflicts with searching for customer. Is this line actually needed?
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

app.get("/vehiclePage/:VIN", function(req, res) {
  var VIN = req.params.VIN;
  //Every vehicle should have its own unique VIN
  //We are searching for this because we agreed that the 
  //customer's profiles wouldn't hold the vehicles
  vehicleModel.findOne( { VIN : VIN } , function(err, Vehicle) {
      if (err)
          console.error(err);
      if (Vehicle) {
          console.log("searched vehicle: " + Vehicle);
          repairOrderModel.find( { VIN: VIN } , function (err, RO) {
            if (err)
              console.log(err);
            if (RO) {
              //RO = ("[" + RO + "]");
              console.log("seara ROs: " + RO);
            }
            else { //a vehicle can have no ROs yet
              console.log("no ROs found");
              RO = []; 
            }
            //console.log("formed:" + RO);
            var result = Object.keys(RO).map(function(key) {
              return [RO[key]];
            });
            console.log("result:" + result);
            res.render("vehiclePage", {Vehicle:Vehicle, RO:RO});
          });
      }
      else {
        console.log("no result found for VIN search, display something?");
      }
    });
});


// Keep this at the bottom of the page.
// Whoever is not on aws cloud 9, your ports will be different.
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started.");
});