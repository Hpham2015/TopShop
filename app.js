var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var mongoURL = 'mongodb://localhost:27017/TopShop';

//Set the below to true if your database is empty to populate the database
//with dummy information. Note that if set to true, then going to the 
//landing page will reset the database to its default hardcoded values.
var databaseNeedsPopulating = false;

app.use(bodyParser.urlencoded({extended: true}));   // used to extract data from page body
app.use(express.static(__dirname + "/public"));     // shorten links to public folder
app.set("view engine", "ejs");    // use ejs files

app.use(express.json());       // to support JSON-encoded bodies
app.use(bodyParser.json());    //allows us to read data from page by looking at data

// Models
var jobModel = require('./models/JobSchema.js');
var lastServiceModel = require('./models/LastServiceSchema.js');
var vehicleModel = require('./models/VehicleSchema.js');
var VehicleInspectionFormModel = require('./models/VehicleInspectionFormSchema.js');
var customerModel = require('./models/CustomerSchema.js');
var repairOrderModel = require('./models/RepairOrderFormSchema.js');

// Connect to mongoDB
mongoose.connect(mongoURL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ------- Routes -------

/// Landing Page
app.get("/", function(req, res){
  if (databaseNeedsPopulating) {
    var populateDatabaseFunction = require("./populateDatabase.js");
    populateDatabaseFunction.populate();
  }
  res.render("landing");
});

// Dashboard
app.get("/dashboard", function(req, res) {
  res.render("dashboard");
});

//reportObject for read only
var ReportValues = { 
  //customer information
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
    //vechicle information
    vehicles: 
      { 
        year: 2007,
        make: "Honda",
        model: "S2000",
        mileage: 100000,
        VIN: 20872031206534892,
        license: "F8905438"
      },
    //mechanic information  
    Mechanics:[
      {
        ID:12345678910,
        FirstName: "Dominic",
        LastName: "Toreto"
      },
      {
        ID:57482093723,
        FirstName: "Harry",
        LastName: "Potter"
      }
      ],
      //repairs information
      Repairs:[
        {
        RepairType:"CustomerPay",
        Repair:{
          complaint:"too expensive",
          cause:"car crash",
          resolution:"it got fixed"
          },
        cost:1234
        },
        {
        RepairType:"warranty",
        Repair:{
          complaint:"none",
          cause:"panel over laod",
          resolution:"paid in full"
          },
        cost:2000
        }
        ],
        //Vehicle Inspeciton information
        VehicleInspection:
        {
          RequiresImmediate:"require immediate",
          MayRequire:"may require",
          Checked:"checked and ok",
          LFTreadDepth:12,
          RFTreadDepth:16,
          LRTreadDepth:10,
          RRTreachDepth:12,
          LFPreasure:50,
          RFPreasure:70,
          LRPreasure:50,
          RRPreasure:50
          
        },
        Comments:"Jack the vehicle up using the jack points closest to the tire. Slowly rotate the tire to find the problem. If you don’t see an object sticking out of the tire or a hole, there’s a trick to discovering the leak. Make a mixture of liquid soap and water. As you brush the water on the tire, the mixture will create bubbles where the hole is located. If you mark the hole with chalk or white shoe polish you can easily find it again."
};

app.get("/ReadOnly", function(req, res) {
  res.render("ReadOnly", {ReportValues:ReportValues});
});

app.get("/about", function(req, res) {
  res.render("about", {ReportValues:ReportValues});
});

// Customer Input
app.get("/customerInputForm", function(req, res){
  res.render("customerInputForm");
});

app.post("/customerInputForm", function(req, res){
  var customerID = req.body.customerID;
  if (customerID.length !== 10) { //validation
    console.log("Invalid Customer ID");
  }
  else {
    var action = req.body.action;
    //We don't use a model here because everytime we make a model, it generates
    //a new _id. This messes with the update function because the _id is new.
    let customerInstance = ({
      customerID: customerID,
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
    if (action == "create") {
      //We use a model here because when creating a new customer, there is no
      //_id to compare to. Therefore, we can safely make a new model here.
      var newCustomer = new customerModel(customerInstance);
      newCustomer.save(function(err){
        if (err) console.log(err);
      });
      console.log("Created Customer");
      res.redirect("/customerInputForm");
    }
    else if (action == "update") {
      //Search for a customer with the same customerID, then update it with new values
      customerModel.findOneAndUpdate({customerID: customerID}, customerInstance,
        {upsert: true}, function(err) {
          if (err) console.log(err);
          else console.log("Successfully updated Vehicle");
        });
      res.redirect("/customerInputForm");
    }
    else if (action == "delete") {
      //search and delete a customer with the same customerID inputted.
      customerModel.findOneAndDelete({customerID: customerID}, function(err, Customer) {
        if (err) console.log(err);
        else console.log("Deleted Customer with ID: " + customerID);
      });
      res.redirect("/customerInputForm");
    }
  }
});

// adds new customer to DB
app.post("/customerInputForm", function(req, res){
  // Initlializes customer object with information from forms upon submit
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
  
  // saves object into database, if saving fails then output error to console, then redirect to blank input page
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
  var VIN = req.body.vin;
  if (VIN.length !== 17) { //validation
    console.log("Invalid VIN");
  }
  else {
    var action = req.body.action;
    //We don't use a model here because everytime we make a model, it generates
    //a new _id. This messes with the update function because the _id is new.
    var vehicleInstance = ({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      licenseNum: req.body.license,
      VIN: req.body.vin,
      color: req.body.color,
      type: req.body.type,
      mileage: req.body.mileage,
      lastSrvc: lastServiceModelInstance  // sets this field to previously initialized last service object
    });
    if (action == "create") {
      // initializes last service information instance with default values
      var lastServiceModelInstance = new lastServiceModel({ // declare with default values
        date: '1-1-00',
        odometer: 0,
        dailyAverageMiles: 0,
        monthlyAverageMiles: 0
      });
      
      // initializes vehicle object with information from form upon submit
      var newVehicleObj = new vehicleModel({vehicleInstance});
      
      // saves vehicle object to database, if fails, outputs error to console, then redirects to blank form page
      newVehicleObj.save(function(err) {
        if (err) console.log(err);
        res.redirect("/vehicleInputForm");
      });
    }
    if (action == "update") {
      vehicleModel.findOneAndUpdate({VIN: VIN}, vehicleInstance,
        {upsert: true}, function(err) {
          if (err) console.log(err);
          else console.log("Sucessfully updated Vehicle");
        });
      res.redirect("/vehicleInputForm");
    }
    else if (action == "delete") {
      vehicleModel.findOneAndDelete({VIN: VIN}, function(err, Vehicle) {
        if (err) console.log(err);
        else console.log("Deleted Vehicle with VIN: " + VIN);
      });
      res.redirect("/vehicleInputForm");
    }
  }
});

// Repair Order Form
app.get("/repairOrderForm", function(req, res){
  res.render("repairOrderForm");
});

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
              app.locals.Customer = Customer;
              app.locals.Vehicle = Vehicle;
              app.locals.RO = RO;
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

//  Add, update and delete repair order form
//  
//  First, it will check length of ROF# whether is equal to 5 or not
//  
//  Adding:
//    If RO exists, it won't be added
//    If RO does not exist, it will be created and added to db
//    
//  Updating:
//    If RO exists, its old version will be deleted and its new version is added
//    If RO does not exist. nothing will happen
//
//  Deleting:
//    Find RO and delete, if not found, nothing will happen
app.post("/repairOrderForm", function(req, res) {
  var n = req.body.repair_order_number;
  if (n.length !== 5) {
    console.log("Invalid ROF #");
  }
  else {
    var action = req.body.action;
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
      
    if (action == "submit") { 
      repairOrderModel.update({repairOrderNumber: req.body.repair_order_number},
        repairOrderInstance, {upsert: true}, function(err, doc) {
          if (err) console.log("Repair Order Form existed");
          else console.log("Successfully added");
        });
    }
    // If RO does not exist, it will be added
    else if (action == "update") {
      repairOrderModel.findOneAndDelete({repairOrderNumber: req.body.repair_order_number}).exec();
      repairOrderModel.update({repairOrderNumber: req.body.repair_order_number},
        repairOrderInstance, {upsert: true}, function(err, doc) {
          if (err) console.log(err);
          else console.log("Successfully updated");
        });
      
    }
    // TO DELETE, JUST ENTER REPAIR ORDER ID
    else if (action == "delete") {
      repairOrderModel.find({repairOrderNumber: req.body.repair_order_number}).remove(function(err) {
        if (err) console.log(err);
        else console.log("ROF deleted");
      });
    }
  }
  res.redirect("/searchPage");
});


// Vehicle Inspection Form
app.get("/vehicleInspectionForm", function(req, res) {
  res.render("vehicleInspectionForm", 
    { Customer: app.locals.Customer, Vehicle: app.locals.Vehicle, RO: app.locals.RO } );
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
var lastService1 = new lastServiceModel({
    date: new Date('December 1, 2011 01:11:11'),
    odometer: 11111,
    dailyAverageMiles: 30,
    monthlyAverageMiles: 900
});
var newVehicle1 = new vehicleModel({
    customerID: 1672548348,
    make: "Toyota",
    model: "Camry",
    year: 2019,
    licenseNum: "9J1JB12",
    VIN: "1FAPP36X6RK192113",
    color: "Red",
    type: "Midsize",
    mileage: 11111,
    lastSrvc: lastService1
});
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
      newVehicle1
    ]
};


app.get("/customerPage", function(req, res) {
  res.render("customerPage", {Customer:Customer});
});

//search for customer by customer ID
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

//---  There are 6 actions from searchPage
//
//    searchByCustomerName
//      Search for customers by their first and last name
//
//    searchByCustomerEmail
//      Search for customers by their email
//
//    searchByCustomerID
//      Search for a customer by their ID
//
//    searchByVIN
//      Search for a vehicle by its VIN
//
//    searchByLicense
//      Search for a vehicle by its license
// 
//    searchByRepairOrderNumber
//      Search for a repair order by its number (ID)
app.post("/searchPage", function(req, res) {
  var action = req.body.action;
  if (action == "searchByCustomerName") {
    var firstName = req.body.customerFirstName.trim();
    var lastName = req.body.customerLastName.trim();
    //find() function will return a list. Regex is done so it's case insensitive
    customerModel.find( { firstName : {$regex: firstName, $options: "i" }, 
                          lastName: {$regex: lastName, $options: "i" } } , 
                          function (err, result) {
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
    var email = req.body.customerEmail.trim();
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
    var VIN = req.body.vin;
    res.redirect("/vehiclePage/VIN/" + VIN);
  }
  else if (action == "searchByLicense") {
    var license = req.body.license;
    res.redirect("vehiclePage/license/" + license);
  }
  else if (action == "searchByRepairOrderNumber"){
    var key = req.body.repairOrderNumber;
    var query = repairOrderModel.find({repairOrderNumber: key}, function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        if (doc === undefined || doc.length == 0) {
          console.log("ROF not existed");
          res.redirect("/searchPage");
          return;
        }
        res.redirect("/repairOrderForm");
        app.locals.rofNumber = doc[0].repairOrderNumber;
        app.locals.vin = doc[0].VIN;
        app.locals.customerID = doc[0].customerID;
        
        if (typeof doc[0].jobs[0] !== 'undefined') {
          app.locals.job_1_type = doc[0].jobs[0].repairType;
          app.locals.job_1_complaint = doc[0].jobs[0].complaint;
          app.locals.job_1_cause = doc[0].jobs[0].cause;
          app.locals.job_1_resolution = doc[0].jobs[0].resolution;
          app.locals.job_1_cost = doc[0].jobs[0].cost;
        }
        
        if (typeof doc[0].jobs[1] !== 'undefined') {
          app.locals.job_2_type = doc[0].jobs[1].repairType;
          app.locals.job_2_complaint = doc[0].jobs[1].complaint;
          app.locals.job_2_cause = doc[0].jobs[1].cause;
          app.locals.job_2_resolution = doc[0].jobs[1].resolution;
          app.locals.job_2_cost = doc[0].jobs[1].cost;
        }
        
        if (typeof doc[0].jobs[2] !== 'undefined') {
          app.locals.job_3_type = doc[0].jobs[2].repairType;
          app.locals.job_3_complaint = doc[0].jobs[2].complaint;
          app.locals.job_3_cause = doc[0].jobs[2].cause;
          app.locals.job_3_resolution = doc[0].jobs[2].resolution;
          app.locals.job_3_cost = doc[0].jobs[2].cost;
        }
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

//search for vehicle by VIN
app.get("/vehiclePage/VIN/:VIN", function(req, res) {
  var VIN = req.params.VIN;
  //Every vehicle should have its own unique VIN
  vehicleModel.findOne( { VIN : VIN } , function(err, Vehicle) {
      if (err)
          console.error(err);
      if (Vehicle) {
          repairOrderModel.find( { VIN: VIN } , function (err, RO) {
            if (err)
              console.log(err);
            if (!RO) { 
              // If RO doesn't exist, then this will execute
              // because if RO doesn't exist, then !RO will return true.
              // If RO exists, then !RO will return false.
              // This is done because a RO must be passed into the page.
              RO = [];
            }
            res.render("vehiclePage", {Vehicle:Vehicle, RO:RO});
          });
      }
      else {
        res.render("vehiclePage", { Err : "No vehicle found with VIN: " + VIN});
        console.log("No result found for VIN search. You searched for VIN: "+ VIN);
      }
    });
});

//search for vehicle by license
app.get("/vehiclePage/license/:license", function(req, res) {
  var license = req.params.license;
  //Every vehicle should have its own unique license
  vehicleModel.findOne( { licenseNum : license } , function(err, Vehicle) {
      if (err)
          console.error(err);
      if (Vehicle) {
          console.log("searched vehicle: " + Vehicle);
          repairOrderModel.find( { VIN: Vehicle.VIN } , function (err, RO) {
            if (err)
              console.log(err);
            if (!RO) { 
              // If RO doesn't exist, then this will execute
              // because if RO doesn't exist, then !RO will return true.
              // If RO exists, then !RO will return false.
              // This is done because a RO must be passed into the page.
              RO = [];
            }
            res.render("vehiclePage", {Vehicle:Vehicle, RO:RO});
          });
      }
      else {
        res.render("vehiclePage", { Err : "No vehicle found with license: " + license});
        console.log("No result found for VIN search. You searched for license: "+ license);
      }
    });
});


// Keep this at the bottom of the page.
// Whoever is not on aws cloud 9, your ports will be different.
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started.");
});